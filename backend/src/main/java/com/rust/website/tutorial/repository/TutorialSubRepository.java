package com.rust.website.tutorial.repository;

import com.rust.website.tutorial.model.entity.TutorialSub;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface TutorialSubRepository extends JpaRepository<TutorialSub, Integer> {
    @Query(value="select * from TutorialSub where tutorial_id = ?1 and number = " +
            "(select MIN(t.number) from TutorialSub t where tutorial_id = ?1 and t.number > " +
            "(select t2.number from TutorialSub t2 where id = ?2)) ", nativeQuery = true)
    public Optional<TutorialSub> findNextTutorialSub(int id, int subId);

    @Query(value="select * from TutorialSub where tutorial_id = ?1 and number = " +
            "(select MAX(t.number) from TutorialSub t where tutorial_id = ?1 and t.number < " +
            "(select t2.number from TutorialSub t2 where id = ?2)) ", nativeQuery = true)
    public Optional<TutorialSub> findPreTutorialSub(int id, int subId);
}
