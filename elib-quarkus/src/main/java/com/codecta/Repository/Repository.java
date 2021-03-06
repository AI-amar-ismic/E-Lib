package com.codecta.Repository;

import com.codecta.Repository.entities.ModelObject;

import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;
import javax.persistence.EntityManager;
import javax.persistence.TypedQuery;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Root;
import javax.transaction.Transactional;
import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.List;

public class Repository<T extends ModelObject, PK extends Serializable> {

    private Class<T> entityClass;

    protected Repository(Class<T> entityClass){
        this.entityClass=entityClass;
    }

    @Inject
    EntityManager entityManager;

    public T add(T modelObject)
    {
        modelObject.setCreatedOn(LocalDateTime.now());
        modelObject.setModifiedOn(LocalDateTime.now());
        entityManager.persist(modelObject);
        return modelObject;
    }

    public List<T> findAll() {
        CriteriaBuilder cb = entityManager.getCriteriaBuilder();
        CriteriaQuery<T> cq = cb.createQuery(this.entityClass);
        Root<T> root = cq.from(this.entityClass);
        CriteriaQuery<T> all = cq.select(root);
        TypedQuery<T> allQuery = entityManager.createQuery(all);
        return allQuery.getResultList();
    }

    public T findById(PK id)
    {
        T result = entityManager.find(this.entityClass, id);
        if(result != null) {
            return result;
        }
        return null;
    }

    public T save(T modelObject)
    {
        T result = null;
        PK id = (PK)modelObject.getId();
        if(id != null) {
            result = findById(id);
        }
        if(id != null || result!= null) {
            entityManager.persist(modelObject);
            return modelObject;
        }
        return null;
    }

    public T delete (PK id){
        T result = null;
        if (id != null) {
            result = findById(id);
        }
        if (id != null || result!=null){
            entityManager.remove(result);
            return result;
        }
        return null;
    }


}
