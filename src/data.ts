export const data = {
  workouts: [
    {
      id: "5tons",
      mode: "свободное",
      description:
        "Испытание 5 + 5 тонн - челлендж состоящий из двух упражнений подтягивание и отжимание на брусьях в совокупном объеме 5 тонн в каждом упражнении, за короткий промежуток времени",
      nameEN: "Challenge 5 tons",
      nameRU: "Испытание Семенихина",
      order: 5,
      timeLimit: 600,
      img: "/img/challenge5tons.jpg",
      needWeight: true,
      exercises: [
        {
          id: "pullup",
          name: "Подтягивание",
          img: "/workouts/pull-ups.png",
        },
        {
          id: "dips",
          name: "Отжимание на брусьях",
          img: "/workouts/bars-push-ups.png",
        },
      ],
    },
    {
      id: "fullbody",
      mode: "свободное",

      description:
        "Тренировка на все тело - комплексное занятие, прорабатывающее все основные группы мышц тела, она отлично подходит для новичков, экономии времени и частого тренировочного цикла, включая в себя базовые многосуставные упражнения",
      nameEN: "Fullbody",
      nameRU: "Тренировка на все тело",
      order: 1,

      img: "/img/fullbody.jpg",
      exercises: [
        {
          id: "pullup",
          name: "Подтягивание",
          img: "/workouts/pull-ups.png",
          sets: 4,
          reps: 12,
        },
        {
          id: "pushup",
          name: "Отжимание",
          img: "/workouts/push-ups.png",
          sets: 4,
          reps: 30,
        },
        {
          id: "squat",
          name: "Приседание",
          img: "/workouts/prised.png",
          sets: 4,
          reps: 30,
        },
        {
          id: "leglift",
          name: "Подьем ног",
          img: "/workouts/press.png",
          sets: 4,
          reps: 15,
        },
      ],
    },
    {
      id: "pecstriceps",
      mode: "свободное",

      description:
        "Грудные мыщцы - самая большая и заметная мышца, она покрывает всю переднюю часть грудной клетки, придает объем и красоту, отвечают за приведение и сгибание рук, вращение плеча и дыхание. Трицепс - трехглавая мышца плеча, производит разгибание локтя, находится на задней стороне плечевой кости, один из основных двигательных мыщц руки",
      nameEN: "Pecs and triceps",
      nameRU: "Грудные мыщцы и трицепс",
      order: 2,
      img: "/img/pecs.jpg",
      gym: false,
      exercises: [
        {
          id: "benchpress",
          name: "Жим лежа",
          img: "/workouts/bench press.png",
          sets: 4,
          reps: 12,
        },
        {
          id: "pushup",
          name: "Отжимание",
          img: "/workouts/push-ups.png",
          sets: 4,
          reps: 30,
        },
        {
          id: "lyingdumbbellfly",
          name: "Разведение гантелей лежа",
          img: "/workouts/lying dumbbell fly.png",
          sets: 4,
          reps: 30,
        },
        {
          id: "dips",
          name: "Отжимание на брусьях",
          img: "/workouts/bars-push-ups.png",
          sets: 4,
          reps: 15,
        },
      ],
    },
    {
      id: "legs",
      mode: "свободное",

      description:
        "Тренировка ног — это комплекс упражнений, направленных на укрепление мышц нижних конечностей. Ноги играют ключевую роль в повседневной активности",
      nameEN: "Leg workout",
      nameRU: "Тренировка ног",
      order: 3,
      img: "/img/legs.jpg",

      exercises: [
        {
          id: "lunges",
          name: "Выпады",
          img: "/workouts/lunges.png",
          sets: 4,
          reps: 30,
        },
        {
          id: "squat",
          name: "Приседание",
          img: "/workouts/prised.png",
          sets: 4,
          reps: 40,
        },
        {
          id: "stepup",
          name: "Вышагивания",
          img: "/workouts/step up.png",
          sets: 4,
          reps: 20,
        },
      ],
    },
    {
      id: "abs",
      mode: "свободное",

      description:
        "Сильный и рельефный живот — это не только эстетика, но и здоровье спины. Упражнения на пресс помогают поддерживать фигуру и укреплять мышцы кора.",
      nameEN: "Abs training",
      nameRU: "Тренировка пресса",
      order: 4,
      img: "/img/abs.jpg",

      exercises: [
        {
          id: "leglift",
          name: "Подьем ног",
          img: "/workouts/press.png",
          sets: 4,
          reps: 15,
        },
        {
          id: "press",
          name: "Пресс",
          img: "/workouts/presslie.png",
          sets: 4,
          reps: 40,
        },
        {
          id: "elbowplanc",
          name: "Планка на локтях",
          img: "/workouts/elbow planck.png",
          static: true,
          sets: 4,
          reps: 60,
        },
      ],
    },
    {
      id: "streetworkout",
      mode: "свободное",

      description:
        "Street Workout - это популярное молодежное спортивное направление, базирующееся на тренировках с собственным весом на открытом воздухе (турники, брусья, шведские стенки). Оно сочетает элементы гимнастики, калистеники и паркура для развития силы, выносливости, координации и создания атлетичного телосложения. Это доступный, бесплатный вид спорта, объединяющий людей  развивающийся как субкультура.",
      nameEN: "Street workout",
      nameRU: "Street Workout",
      order: 5,
      img: "/img/workout.jpg",

      exercises: [
        {
          id: "pullup",
          name: "Подтягивание",
          img: "/workouts/pull-ups.png",
          reps: 15,
          sets: 4,
        },
        {
          id: "dips",
          name: "Отжимание на брусьях",
          img: "/workouts/bars-push-ups.png",
          reps: 20,
          sets: 4,
        },
        {
          id: "leglift",
          name: "Подьем ног",
          img: "/workouts/press.png",
          reps: 25,
          sets: 4,
        },
      ],
    },
  ],
};

export const exercises = [
  {
    id: "pullup",
    name: "Подтягивание",
    img: "/workouts/pull-ups.png",
    equipment: ["bodyweight"],
  },
  {
    id: "corner",
    name: "Уголок",
    img: "/workouts/corner.png",
    static: true,
    equipment: ["bodyweight"],
  },
  {
    id: "pushup",
    name: "Отжимание",
    img: "/workouts/push-ups.png",
    equipment: ["bodyweight"],
  },
  {
    id: "leglift",
    name: "Подьем ног",
    img: "/workouts/Hanging Leg Raise.png",
    equipment: ["bodyweight"],
  },
  {
    id: "squat",
    name: "Приседание",
    img: "/workouts/prised.png",
    equipment: ["bodyweight"],
  },
  {
    id: "dips",
    name: "Отжимание на брусьях",
    img: "/workouts/bars-push-ups.png",
    equipment: ["bodyweight"],
  },
  {
    id: "sidelateralraises",
    name: "Махи в сторону",
    img: "/workouts/side lateral raises.png",
    equipment: ["dumbbell"],
  },
  {
    id: "benchpress",
    name: "Жим лежа",
    img: "/workouts/bench press.png",
    equipment: ["barbell", "dumbbell"],
  },
  {
    id: "bicepcurls",
    name: "Подъем на бицепс",
    img: "/workouts/bicep lift.png",
    equipment: ["barbell", "dumbbell"],
  },
  {
    id: "lunges",
    name: "Выпады",
    img: "/workouts/lunges.png",
    equipment: ["bodyweight", "dumbbell", "barbell"],
  },
  {
    id: "hangonthebar",
    name: "Вис на турнике",
    img: "/workouts/hangonthebar.png",
    static: true,
    equipment: ["bodyweight"],
  },
  ,
  {
    id: "press",
    name: "Подъем туловища",
    img: "/workouts/presslie.png",
    equipment: ["bodyweight", "dumbbell"],
  },
  {
    id: "hyperextension",
    name: "Гиперэкстензия",
    img: "/workouts/hyperextension.png",
    equipment: ["bodyweight", "dumbbell"],
  },
  {
    id: "bentoverbarbellrow",
    name: "Тяга штанги в наклоне",
    img: "/workouts/bent-over row.png",
    equipment: ["barbell", "dumbbell"],
  },
  {
    id: "leanforward",
    name: "Наклон вперед",
    img: "/workouts/lean forward.png",
    equipment: ["barbell"],
  },
  {
    id: "deadlift",
    name: "Становая тяга",
    img: "/workouts/deadlift.png",
    equipment: ["barbell", "dumbbell"],
  },
  {
    id: "sealrow",
    name: "Тяга штанги лежа",
    img: "/workouts/barbell thrust lie.png",
    equipment: ["barbell"],
  },
  {
    id: "singlearmdumbbellrow",
    name: "Тяга гантелей в наклоне",
    img: "/workouts/single-arm dumbbell row.png",
    equipment: ["dumbbell"],
  },
  {
    id: "shrugs",
    name: "Шраги",
    img: "/workouts/shrugs.png",
    equipment: ["barbell", "dumbbell"],
  },
  {
    id: "horizontalrow",
    name: "Горизонтальная тяга",
    img: "/workouts/horizontal row.png",
    equipment: ["machine"],
  },
  {
    id: "dumbbellpullover",
    name: "Пулловер",
    img: "/workouts/pullover.png",
    equipment: ["machine"],
  },
  {
    id: "dumbbellpress",
    name: "Жим гантелей лежа",
    img: "/workouts/dumbbell press.png",
    equipment: ["dumbbell"],
  },

  {
    id: "lyingdumbbellfly",
    name: "Разведение гантелей лежа",
    img: "/workouts/lying dumbbell fly.png",
    equipment: ["dumbbell"],
  },
  {
    id: "pullover",
    name: "Пулловер с гантелью",
    img: "/workouts/dumbbell pullover.png",
    equipment: ["dumbbell"],
  },
  {
    id: "butterfly",
    name: "Бабочка",
    img: "/workouts/Butterfly Machine.png",
    equipment: ["machine"],
  },
  {
    id: "cablecrossover",
    name: "Кроссовер",
    img: "/workouts/Cable Crossover.png",
    equipment: ["machine"],
  },
  {
    id: "legpress",
    name: "Жим ногами",
    img: "/workouts/leg press.png",
    equipment: ["machine"],
  },
  {
    id: "stepup",
    name: "Вышагивания",
    img: "/workouts/step up.png",
    equipment: ["bodyweight", "dumbbell"],
  },
  {
    id: "romaniandeadlift",
    name: "Румынская тяга",
    img: "/workouts/Romanian Deadlift.png",
    equipment: ["barbell"],
  },
  {
    id: "seatedlegextension",
    name: "Разгибание ног",
    img: "/workouts/Seated Leg Extension.png",
    equipment: ["machine"],
  },
  {
    id: "lyinglegcurl",
    name: "Сгибание ног",
    img: "/workouts/Lying Leg Curl.png",
    equipment: ["machine"],
  },
  {
    id: "standincvalfraises",
    name: "Подъемы на носки",
    img: "/workouts/Standing Calf Raises.png",
    equipment: ["bodyweight", "dumbbell"],
  },
  {
    id: "elbowplanc",
    name: "Планка на локтях",
    img: "/workouts/elbow planck.png",
    static: true,
    equipment: ["bodyweight"],
  },
  {
    id: "planc",
    name: "Полная планка",
    img: "/workouts/planck.png",
    static: true,
    equipment: ["bodyweight"],
  },
  {
    id: "benchdips",
    name: "Обратные отжимания",
    img: "/workouts/Bench Dips.png",
    equipment: ["bodyweight"],
  },
  {
    id: "dumbbellkickback",
    name: "Разгибание рук с гантелью",
    img: "/workouts/Dumbbell Kickback.png",
    equipment: ["dumbbell"],
  },
  {
    id: "cabletriceppushdowns",
    name: "Разгибание рук в кроссовере",
    img: "/workouts/Cable Tricep Pushdowns.png",
    equipment: ["machine"],
  },
  {
    id: "crunches",
    name: "Скручивание на пресс",
    img: "/workouts/crunches.png",
    equipment: ["bodyweight"],
  },
  {
    id: "ReversePecDeckFly",
    name: "Разведение рук в тренажере ",
    img: "/workouts/Reverse Pec Deck Fly.png",
    equipment: ["machine"],
  },
  {
    id: "BarDips",
    name: "Отжимание на перекладине",
    img: "/workouts/Bar dips.png",
    equipment: ["bodyweight"],
  },
  {
    id: "LatPullDown",
    name: "Вертикальная тяга",
    img: "/workouts/Lat pull-down.png",
    equipment: ["machine"],
  },
];
