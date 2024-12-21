<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use Doctrine\ORM\EntityManagerInterface;

use App\Entity\Category;
use App\Entity\Breed;


class PetController extends AbstractController
{
    #[Route('/', name: 'pet_list')]
    public function index(): Response
    {
        return $this->render('pet/index.html.twig', [
            'controller_name' => 'PetController',
            'data'
        ]);
    }

    #[Route('/pet', name: 'pet_create')]
    public function create(EntityManagerInterface $em): Response
    {

        $categoryRepository = $em->getRepository(Category::class);
        $categories = $categoryRepository->findAll();   
        return $this->render('pet/create.html.twig', [
            'controller_name' => 'PetController',
            'categories' => $categories
        ]);
    }
}
