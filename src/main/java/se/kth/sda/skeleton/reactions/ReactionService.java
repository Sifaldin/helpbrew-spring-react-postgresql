package se.kth.sda.skeleton.reactions;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ReactionService {
    @Autowired
    private ReactionRepo reactionRepo;


    /**
     * This function invokes the findAll function in the reactionRepository to getAll the reactions
     * available in the data base.
     * @return List of all reactions.
     */
    public List<Reaction> getAll() {
        return reactionRepo.findAll();
    }


    /**
     * This function invokes the findById function in the reactionRepository to get all the reactions
     * with a specific id available in the data base.
     * @param id
     * @return The reaction with a specific ID
     */
    public Optional<Reaction> getById(long id) {
        return reactionRepo.findById(id);
    }


    /**
     * This function invokes the save function in the reactionRepository to save the incoming data in
     * the reaction table.
     * @param newReaction
     * @return The new total of reactions.
     */
    public Reaction create(Reaction newReaction) {
        return reactionRepo.save(newReaction);
    }

    /**
     * This function invokes the save function in the reactionRepository to update an existing reaction
     * with the incoming data in the reaction table.
     * @param updatedReaction
     * @return The updated total of reactions.
     */
    public Reaction update(Reaction updatedReaction) {
        return reactionRepo.save(updatedReaction);
    }

    /**
     * This function invokes the delete function in the reactionRepository to delete an existing reaction
     * with a specific id.
     * @param id
     */
    public void delete(Long id) {
        reactionRepo.deleteById(id);
    }
}
