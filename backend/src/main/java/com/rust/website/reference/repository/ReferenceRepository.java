package com.rust.website.reference.repository;

import com.rust.website.reference.model.entitiy.Reference;
import com.rust.website.tutorial.model.entity.TutorialSub;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface ReferenceRepository extends JpaRepository<Reference, Integer> {
    @Query(value = "select r.id, r.name, r.number, r.date, null as 'content' from Reference r", nativeQuery = true)
    public List<Reference> findReferences();

    @Query(value="select * from Reference where number = " +
            "(select MIN(number) from Reference where number > " +
            "(select number from Reference where id = ?1))", nativeQuery = true)
    public Reference findNextReference(int id);

    @Query(value="select * from Reference where number = " +
            "(select MAX(number) from Reference where number < " +
            "(select number from Reference where id = ?1))", nativeQuery = true)
    public Reference findPreReference(int id);
}
