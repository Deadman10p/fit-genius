
export const programs = {
  beginner: {
    fullBody: {
      weeks: 4,
      schedule: [
        {
          day: 1,
          focus: "Full Body",
          exercises: [
            {
              name: "Push-ups",
              sets: "3x8-10",
              progression: "Add elevation as needed"
            },
            {
              name: "Bodyweight Squats",
              sets: "3x12-15",
              progression: "Progress to goblet squats when ready"
            },
            {
              name: "Assisted Pull-ups",
              sets: "3x6-8",
              progression: "Reduce assistance over time"
            },
            {
              name: "Plank",
              sets: "3x30s",
              progression: "Increase hold time by 5s each week"
            },
            {
              name: "Dumbbell Rows",
              sets: "3x10 each side",
              progression: "Increase weight by 2-5 lbs when possible"
            }
          ],
          restDays: "Rest 1-2 minutes between sets"
        },
        {
          day: 2,
          focus: "Recovery/Cardio",
          exercises: [
            {
              name: "Brisk Walking",
              sets: "20-30 minutes",
              progression: "Increase duration or add incline"
            },
            {
              name: "Mobility Work",
              sets: "10 minutes",
              progression: "Focus on hip and shoulder mobility"
            }
          ]
        },
        {
          day: 3,
          focus: "Full Body",
          exercises: [
            {
              name: "Lunges",
              sets: "3x10 each leg",
              progression: "Add dumbbells when form is solid"
            },
            {
              name: "Incline Push-ups",
              sets: "3x10-12",
              progression: "Lower the incline gradually"
            },
            {
              name: "Inverted Rows",
              sets: "3x8-10",
              progression: "Lower body position to increase difficulty"
            },
            {
              name: "Glute Bridges",
              sets: "3x15",
              progression: "Progress to single-leg version"
            },
            {
              name: "Bird Dogs",
              sets: "3x8 each side",
              progression: "Add hold time at extension"
            }
          ],
          restDays: "Rest 1-2 minutes between sets"
        }
      ]
    }
  },
  
  intermediate: {
    upperLower: {
      weeks: 8,
      schedule: [
        {
          day: 1,
          focus: "Upper Body",
          exercises: [
            {
              name: "Bench Press",
              sets: "4x8-10",
              progression: "Add 5 lbs when you can complete all reps"
            },
            {
              name: "Bent-Over Rows",
              sets: "4x10",
              progression: "Focus on full range of motion"
            },
            {
              name: "Overhead Press",
              sets: "3x8-10",
              progression: "Micro-load with 2.5 lb increments"
            },
            {
              name: "Pull-ups/Chin-ups",
              sets: "3x6-8",
              progression: "Add weight when you can do 10+ reps"
            },
            {
              name: "Lateral Raises",
              sets: "3x12-15",
              progression: "Slow eccentric phase"
            },
            {
              name: "Tricep Pushdowns",
              sets: "3x12",
              progression: "Increase weight or slow tempo"
            }
          ]
        },
        {
          day: 2,
          focus: "Lower Body",
          exercises: [
            {
              name: "Barbell Squats",
              sets: "4x8-10",
              progression: "Progressive overload by 5-10 lbs per week"
            },
            {
              name: "Romanian Deadlifts",
              sets: "3x10",
              progression: "Focus on hamstring stretch"
            },
            {
              name: "Walking Lunges",
              sets: "3x12 each leg",
              progression: "Add dumbbells for resistance"
            },
            {
              name: "Leg Press",
              sets: "3x12-15",
              progression: "Use as volume work after main lifts"
            },
            {
              name: "Calf Raises",
              sets: "4x15-20",
              progression: "Vary between seated and standing"
            }
          ]
        }
      ]
    }
  },
  
  athlete: {
    basketball: {
      phases: [
        {
          phase: "Off-season",
          focus: "Strength",
          exercises: [
            "Back Squats 5x5", 
            "Depth Jumps 4x8", 
            "Single-Leg RDLs 3x10 each", 
            "Core Anti-Rotation 3x12"
          ],
          duration: "8 weeks"
        },
        {
          phase: "Pre-season",
          focus: "Power and Conditioning",
          exercises: [
            "Power Cleans 4x3", 
            "Lateral Bounds 4x5 each side", 
            "Sprint Intervals 8x40 yards", 
            "Defensive Slide Drills 4x30 seconds"
          ],
          duration: "4 weeks"
        }
      ]
    }
  }
};
