<?php

namespace App\Repository;

use App\Entity\Breed;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<Breed>
 */
class BreedRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Breed::class);
    }

    /**
    * @return Breed[] Returns an array of Breed objects
    */
    public function findByCategoryId($value): array
    {
        return $this->createQueryBuilder('b')
            ->andWhere('b.category = :val')
            ->setParameter('val', $value)
            ->orderBy('b.id', 'ASC')
            ->getQuery()
            ->getResult()
        ;
    }
}
