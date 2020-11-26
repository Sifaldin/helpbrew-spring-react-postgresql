package se.kth.sda.skeleton.reactions;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ReactionService {
    @Autowired
    private ReactionRepo reactionRepo;

    public List<Reaction> getAll() {
        return reactionRepo.findAll();
    }

    public Optional<Reaction> getById(long id) {
        return reactionRepo.findById(id);
    }

    public Reaction create(Reaction newReaction) {
        return reactionRepo.save(newReaction);
    }

    public Reaction update(Reaction updatedReaction) {
        return reactionRepo.save(updatedReaction);
    }

    public void delete(Long id) {
        reactionRepo.deleteById(id);
    }
}
