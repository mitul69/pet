<?php

namespace App\Controller;

use App\Entity\Category;
use App\Entity\Breed;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\SerializerInterface;

class CategoryController extends AbstractController
{
    #[Route('/api/categories', methods: ['GET'])]
    public function index(EntityManagerInterface $em): JsonResponse
    {         
        $categoryRepository = $em->getRepository(Category::class);
        $categories = $categoryRepository->findAll();         
        return $this->json($categories);
    }

    #[Route('/api/categories/{id}/breeds', methods: ['GET'])]
    public function breeds($id, EntityManagerInterface $em): JsonResponse
    {
         $breedRepository = $em->getRepository(Breed::class);
         $breeds = $breedRepository->findByCategoryId($id);
         return $this->json($breeds);
    }
}
