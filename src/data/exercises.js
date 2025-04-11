
export const exercises = {
  // Strength Training
  strength: [
    {
      id: 1,
      name: "Barbell Deadlift",
      muscles: ["Hamstrings", "Glutes", "Lower Back"],
      equipment: ["Barbell"],
      steps: [
        "Stand with feet hip-width apart, with the barbell over your midfoot",
        "Bend at hips and knees to grip the bar with hands shoulder-width apart",
        "Keep chest up and back flat as you push through heels to stand up",
        "Keep the bar close to your body throughout the movement",
        "Extend hips and knees to stand tall at the top",
        "Return the weight to the floor by hinging at the hips and bending knees"
      ],
      tips: "Keep chest up, avoid rounding back. Engage core throughout the movement.",
      video: "https://example.com/deadlift",
      variations: ["Romanian", "Sumo", "Hex Bar"],
      commonMistakes: [
        {
          title: "Rounded Back",
          fix: "Engage lats and maintain neutral spine"
        },
        {
          title: "Jerking the Bar",
          fix: "Apply tension before lifting, pull smoothly"
        }
      ]
    },
    {
      id: 2,
      name: "Barbell Squat",
      muscles: ["Quadriceps", "Glutes", "Core"],
      equipment: ["Barbell", "Squat Rack"],
      steps: [
        "Position barbell on upper back, slightly below neck",
        "Feet shoulder-width apart, toes slightly turned out",
        "Brace core and begin to sit back and down",
        "Lower until thighs are parallel to ground (or lower if mobility allows)",
        "Push through heels to return to standing position"
      ],
      tips: "Keep chest up, knees tracking over toes. Maintain neutral spine.",
      video: "https://example.com/squat",
      variations: ["Front Squat", "Goblet Squat", "Bulgarian Split Squat"],
      commonMistakes: [
        {
          title: "Knees Caving In",
          fix: "Focus on pushing knees outward during the movement"
        },
        {
          title: "Rising on Toes",
          fix: "Keep weight in heels and midfoot"
        }
      ]
    },
    {
      id: 3,
      name: "Push-Up",
      muscles: ["Chest", "Shoulders", "Triceps"],
      equipment: ["None"],
      steps: [
        "Begin in plank position with hands slightly wider than shoulder-width",
        "Keep body in straight line from head to heels",
        "Lower chest toward floor by bending elbows",
        "Keep elbows at about 45° angle to body",
        "Push back up to starting position"
      ],
      tips: "Keep core engaged throughout. Don't let hips sag.",
      video: "https://example.com/pushup",
      variations: ["Incline", "Decline", "Diamond"],
      commonMistakes: [
        {
          title: "Sagging Hips",
          fix: "Engage core and glutes to maintain straight body line"
        }
      ]
    }
  ],
  
  // Cardio section
  cardio: [
    {
      id: 501,
      name: "HIIT Sprints",
      protocol: "30s sprint/1min walk x 10 rounds",
      calories: "≈300 kcal/30min",
      equipment: ["Treadmill", "Track"],
      benefits: [
        "Increases metabolism",
        "Improves cardiovascular health",
        "Burns fat efficiently"
      ],
      tips: "Start with fewer rounds if beginner. Focus on proper form during sprints."
    },
    {
      id: 502,
      name: "Steady State Jogging",
      protocol: "30-45 minutes at moderate pace",
      calories: "≈400 kcal/45min",
      equipment: ["Running shoes", "Treadmill optional"],
      benefits: [
        "Builds aerobic base",
        "Improves endurance",
        "Lower impact than sprinting"
      ],
      tips: "Maintain conversation pace. Focus on consistent breathing."
    }
  ],
  
  // Mobility section
  mobility: [
    {
      id: 601,
      name: "Thoracic Spine Rotation",
      benefit: "Improves overhead mobility and reduces shoulder pain",
      steps: [
        "Kneel in quadruped position (on hands and knees)",
        "Place one hand behind head, elbow out to side",
        "Rotate upper body, bringing elbow toward ceiling",
        "Hold for 2 seconds at top position",
        "Return to starting position and repeat"
      ],
      sets: "3 sets of 10 reps each side",
      tips: "Keep hips square and minimize lower back movement"
    },
    {
      id: 602,
      name: "Hip Flexor Stretch",
      benefit: "Reduces lower back pain and improves hip extension",
      steps: [
        "Kneel on one knee, other foot flat on ground in front",
        "Keep torso upright and tuck pelvis slightly",
        "Gently push hips forward until stretch is felt",
        "For deeper stretch, raise arm on kneeling side overhead"
      ],
      sets: "Hold 30-60 seconds each side, repeat 3x",
      tips: "Don't arch lower back. Keep core engaged throughout."
    }
  ]
};
