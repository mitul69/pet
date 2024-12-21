<?php

namespace App\Entity;

use App\Repository\CategoryRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use ApiPlatform\Core\Annotation\ApiResource;

#[ORM\Entity(repositoryClass: CategoryRepository::class), ApiResource]
class Category
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    private ?string $name = null;

    /**
     * @var Collection<int, Breed>
     */
    #[MaxDepth(0)]
    #[ORM\OneToMany(targetEntity: Breed::class, mappedBy: 'category')]
    private Collection $breeds;

    /**
     * @var Collection<int, Pet>
     */
    #[ORM\OneToMany(targetEntity: Pet::class, mappedBy: 'category')]
    private Collection $pets;

    public function __construct()
    {
        $this->breeds = new ArrayCollection();
        $this->pets = new ArrayCollection();
    }


    public function getId(): ?int
    {
        return $this->id;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): static
    {
        $this->name = $name;
        return $this;
    }

    // /**
    //  * @return Collection<int, Breed>
    //  */
    // public function getBreeds(): Collection
    // {
    //     return $this->breeds;
    // }

    public function addBreed(Breed $breed): static
    {
        if (!$this->breeds->contains($breed)) {
            $this->breeds->add($breed);
            $breed->setCategory($this);
        }

        return $this;
    }

    public function removeBreed(Breed $breed): static
    {
        if ($this->breeds->removeElement($breed)) {
            // set the owning side to null (unless already changed)
            if ($breed->getCategory() === $this) {
                $breed->setCategory(null);
            }
        }

        return $this;
    }

    // /**
    //  * @return Collection<int, Pet>
    //  */
    // public function getPets(): Collection
    // {
    //     return $this->pets;
    // }

    public function addPet(Pet $pet): static
    {
        if (!$this->pets->contains($pet)) {
            $this->pets->add($pet);
            $pet->setCategory($this);
        }

        return $this;
    }

    public function removePet(Pet $pet): static
    {
        if ($this->pets->removeElement($pet)) {
            // set the owning side to null (unless already changed)
            if ($pet->getCategory() === $this) {
                $pet->setCategory(null);
            }
        }

        return $this;
    }

    
}
