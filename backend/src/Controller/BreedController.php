<?php

namespace App\Controller;

use App\Entity\Breed;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;


class BreedController extends AbstractController
{
    #[Route('/api/breeds', methods: ['GET'])]
    public function index(EntityManagerInterface $em): JsonResponse
    {
         $breedRepo = $em->getRepository(Breed::class);
         $breeds = $breedRepo->findAll();
         return $this->json($breeds);
    }
}
