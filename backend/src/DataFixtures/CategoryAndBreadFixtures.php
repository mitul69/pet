<?php

namespace App\DataFixtures;

use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use App\Entity\Category;
use App\Entity\Breed;
class CategoryAndBreadFixtures extends Fixture
{
    public function load(ObjectManager $manager): void
    {
        
        $petsInfos = [
            [
                "name" => "Dog",
                "breeds" => [
                    'Golden Retriever',
                    'Labrador Retriever',
                    'German Shepherd',
                    'Bulldog',
                    'Beagle',
                    "It’s a mix",   
                    "I don’t know"
                ]
            ],
            [
                "name" => "Cat",
                "breeds" => [
                    'Persian',
                    'Maine Coon',
                    'Siamese',
                    'Bengal',
                    'Sphynx',
                    "It’s a mix",
                    "I don’t know"
                ]
            ]
        ];

        $categoryEntities = [];
        foreach ($petsInfos as $petsInfo) {
            $category = new Category();
            $category->setName($petsInfo['name']);
            $manager->persist($category);
            foreach($petsInfo['breeds'] as $breed){
                $bread = new Breed();
                $bread->setName($breed);
                $bread->setCategory($category);
                $manager->persist($bread);
            }
        }

        $manager->flush();
    }
}
