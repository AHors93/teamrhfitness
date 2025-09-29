import { eventBus } from "../events";
import { getMuscleId } from "../services/muscleService";
import { getExercisesByMuscle } from "../services/exerciseService";
import { formatExerciseWithMuscleNames } from "../utils/format";
import { FormattedExercise } from "../types/api";

eventBus.on<{ muscleName: string }>("MuscleSelected", async ({ muscleName }) => {
  try {
    console.log(`🔍 Looking up exercises for muscle: ${muscleName}`);
    
    const muscleId = await getMuscleId(muscleName);
    if (!muscleId) {
      console.error(`❌ Unknown muscle: ${muscleName}`);
      console.log("💡 Try: biceps, triceps, quadriceps, hamstrings, chest, back, shoulders, abs");
      return;
    }

    console.log(`✅ Found muscle ID: ${muscleId}`);
    console.log("📡 Fetching exercises...");

    const exercises = await getExercisesByMuscle(muscleId);
    
    // Format exercises with muscle names resolved
    const formatted = await Promise.all(
      exercises.map(exercise => formatExerciseWithMuscleNames(exercise))
    );

    console.log(`\n📊 Found ${exercises.length} exercise(s) for ${muscleName}`);
    eventBus.emit("ExercisesFetched", { exercises: formatted, muscleName });
      } catch (err: unknown) {
        const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
        console.error("❌ Error fetching exercises:", errorMessage);
        if (err instanceof Error && 'code' in err && err.code === 'ENOTFOUND') {
          console.error("💡 Check your internet connection");
        }
      }
});

eventBus.on<{ exercises: (FormattedExercise & { otherMuscleNames: string[] })[], muscleName: string }>("ExercisesFetched", ({ exercises, muscleName }) => {
  if (exercises.length === 0) {
    console.log(`\n😔 No exercises found for ${muscleName}`);
    return;
  }

  exercises.forEach((ex, index) => {
    console.log(`\n${'='.repeat(60)}`);
    console.log(`🏋️  ${index + 1}. ${ex.name}`);
    console.log(`${'='.repeat(60)}`);
    
    const description = ex.description.length > 200 
      ? ex.description.substring(0, 200) + "..." 
      : ex.description;
    console.log(`📝 Description: ${description}`);
    
    console.log(`💪 Other muscles: ${ex.otherMuscleNames.length > 0 ? ex.otherMuscleNames.join(", ") : "None"}`);
  });
  
  console.log(`\n🎉 Displayed ${exercises.length} exercise(s) for ${muscleName}`);
});
