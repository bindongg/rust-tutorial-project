package com.rust.website.reference.repository;

import com.rust.website.reference.model.entitiy.Reference;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ReferenceRepository extends JpaRepository<Reference, Integer> {
    @Query(value = "select r.id, r.name, r.number, r.date, null as 'content' from Reference r", nativeQuery = true)
    public List<Reference> findReferences();
}
