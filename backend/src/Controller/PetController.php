<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\HttpFoundation\Request;

use Doctrine\ORM\EntityManagerInterface;

use App\Entity\Pet;
use App\Entity\Category;
use App\Entity\Breed;


class PetController extends AbstractController
{
    #[Route('/api/pets', name: 'pet_list')]
    public function index(EntityManagerInterface $em): Response
    {
        $petsRepo = $em->getRepository(Pet::class);
        $pets = $petsRepo->findAll();
        return $this->json($pets);
    }

    #[Route('/api/pet', name: 'pet_create',methods: ['POST'])]
    public function create(Request $request, EntityManagerInterface $em): Response
    {

        $data = json_decode($request->getContent(), true);

        $categoryRepository = $em->getRepository(Pet::class);
        
        $pet = new Pet();
        $pet->setName($data['name']);
        $pet->setAge($data['age']);
        $isDanger = $data['dangerous'] === "Yes" ? 1 :0;
        $pet->setIsDanger($isDanger);
        $pet->setGender($data['gender']);
        if($data['knowAge'] == "Yes"){
            $dateString = $data['dob']['year']. "-" . $data['dob']['month'] . "-" . $data['dob']['day'];
            $dateTime = new \DateTime($dateString);
        }
        $pet->setDateOfBirth($dateTime);

        $pet->setCategory($em->getRepository(Category::class)->find($data['category']));
        $pet->setBreed($em->getRepository(Breed::class)->find($data['breed']));

        $em->persist($pet);
        $em->flush();

        return $this->json($pet);
    }
}
