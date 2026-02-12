
export const data = {
  workouts: [
    {
      id: "fullbody",
      description:
        "Фулбоди - комплексное занятие, прорабатывающее все основные группы мышц тела, она отлично подходит для новичков, экономии времени и частого тренировочного цикла, включая в себя базовые многосуставные упражнения",
      nameEN: "Fullbody",
      nameRU: "Фулбоди",
      order: 1,
      img: "/img/fullbody.jpg",
      exercises: [
        {
          id: "pullup",
          name: "Подтягивание",
          img: "/workouts/pull-ups.jpg",
          sets: 4,
          reps: 12,
        },
        {
          id: "pushup",
          name: "Отжимание",
          img: "/workouts/push-ups.jpg",
          sets: 4,
          reps: 30,
        },
        {
          id: "squat",
          name: "Приседание",
          img: "/workouts/prised.jpg",
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
          img: "/workouts/bench press.jpg",
          sets: 4,
          reps: 12,
        },
        {
          id: "pushup",
          name: "Отжимание",
          img: "/workouts/push-ups.jpg",
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
          img: "/workouts/lunges.jpg",
          sets: 4,
          reps: 30,
        },
        {
          id: "squat",
          name: "Приседание",
          img: "/workouts/prised.jpg",
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
          img: "/workouts/elbow planck.jpg",
          static: true,
          sets: 4,
          reps: 60,
        },
      ],
    },
    {
      id: "streetworkout",
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
          img: "/workouts/pull-ups.jpg",
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
    {
      id: "5tons",
      description:
        "Челлендж 5 + 5 тонн - челлендж состоящий из двух упражнений подтягивание и отжимание на брусьях в совокупном объеме 5 тонн в каждом упражнении, за короткий промежуток времени",
      nameEN: "challenge 5 tons",
      nameRU: "Челлендж Семенихина",
      order: 5,
      timeLimit: 600,
      img: "/img/challenge5tons.jpg",
      challenge: true,
      needWeight: true,
      exercises: [
        {
          id: "pullup",
          name: "Подтягивание",
          img: "/workouts/pull-ups.jpg",
        },
        {
          id: "dips",
          name: "Отжимание на брусьях",
          img: "/workouts/bars-push-ups.png",
        },
      ],
    },
  ],
};

export const exercises = [
  {
    id: "pullup",
    name: "Подтягивание",
    img: "/workouts/pull-ups.jpg",
  },
  {
    id: "corner",
    name: "Уголок",
    img: "/workouts/corner.png",
    static: true,
  },
  {
    id: "pushup",
    name: "Отжимание",
    img: "/workouts/push-ups.jpg",
  },
  {
    id: "leglift",
    name: "Подьем ног",
    img: "/workouts/press.png",
  },
  {
    id: "squat",
    name: "Приседание",
    img: "/workouts/prised.jpg",
  },
  {
    id: "dips",
    name: "Отжимание на брусьях",
    img: "/workouts/bars-push-ups.png",
  },
  {
    id: "sidelateralraises",
    name: "Махи в сторону",
    img: "/workouts/side lateral raises.png",
  },
  {
    id: "benchpress",
    name: "Жим лежа",
    img: "/workouts/bench press.jpg",
  },
  {
    id: "bicepcurls",
    name: "Подъем на бицепс",
    img: "/workouts/bicep lift.png",
  },
  {
    id: "lunges",
    name: "Выпады",
    img: "/workouts/lunges.jpg",
  },
  {
    id: "hangonthebar",
    name: "Вис на турнике",
    img: "/workouts/hangonthebar.png",
    static: true,
  },
  ,
  {
    id: "press",
    name: "Подъем туловища",
    img: "/workouts/presslie.png",
  },
  {
    id: "hyperextension",
    name: "Гиперэкстензия",
    img: "/workouts/hyperextension.png",
  },
  {
    id: "bentoverbarbellrow",
    name: "Тяга штанги в наклоне",
    img: "/workouts/bent-over row.png",
  },
  {
    id: "leanforward",
    name: "Наклон вперед",
    img: "/workouts/lean forward.png",
  },
  {
    id: "deadlift",
    name: "Становая тяга",
    img: "/workouts/deadlift.png",
  },
  {
    id: "sealrow",
    name: "Тяга штанги лежа",
    img: "/workouts/barbell thrust lie.png",
  },
  {
    id: "singlearmdumbbellrow",
    name: "Тяга гантелей в наклоне",
    img: "/workouts/single-arm dumbbell row.png",
  },
  {
    id: "shrugs",
    name: "Шраги",
    img: "/workouts/shrugs.png",
  },
  {
    id: "horizontalrow",
    name: "Горизонтальная тяга",
    img: "/workouts/horizontal row.png",
  },
  {
    id: "dumbbellpullover",
    name: "Пулловер",
    img: "/workouts/pullover.png",
  },
  {
    id: "dumbbellpress",
    name: "Жим гантелей лежа",
    img: "/workouts/dumbbell press.png",
  },

  {
    id: "lyingdumbbellfly",
    name: "Разведение гантелей лежа",
    img: "/workouts/lying dumbbell fly.png",
  },
  {
    id: "pullover",
    name: "Пулловер с гантелью",
    img: "/workouts/dumbbell pullover.png",
  },
  {
    id: "butterfly",
    name: "Бабочка",
    img: "/workouts/Butterfly Machine.png",
  },
  {
    id: "cablecrossover",
    name: "Кроссовер",
    img: "/workouts/Cable Crossover.png",
  },
  {
    id: "legpress",
    name: "Жим ногами",
    img: "/workouts/leg press.png",
  },
  {
    id: "stepup",
    name: "Вышагивания",
    img: "/workouts/step up.png",
  },
  {
    id: "romaniandeadlift",
    name: "Румынская тяга",
    img: "/workouts/Romanian Deadlift.png",
  },
  {
    id: "seatedlegextension",
    name: "Разгибание ног",
    img: "/workouts/Seated Leg Extension.png",
  },
  {
    id: "lyinglegcurl",
    name: "Сгибание ног",
    img: "/workouts/Lying Leg Curl.png",
  },
  {
    id: "standincvalfraises",
    name: "Подъемы на носки",
    img: "/workouts/Standing Calf Raises.png",
  },
  {
    id: "elbowplanc",
    name: "Планка на локтях",
    img: "/workouts/elbow planck.jpg",
    static: true,
  },
  {
    id: "planc",
    name: "Полная планка",
    img: "/workouts/planck.jpg",
    static: true,
  },
  {
    id: "benchdips",
    name: "Обратные отжимания",
    img: "/workouts/Bench Dips.png",
  },
  {
    id: "dumbbellkickback",
    name: "Разгибание рук с гантелью",
    img: "/workouts/Dumbbell Kickback.png",
  },
  {
    id: "cabletriceppushdowns",
    name: "Разгибание рук в кроссовере",
    img: "/workouts/Cable Tricep Pushdowns.png",
  },
  {
    id: "crunches",
    name: "Скручивание на пресс",
    img: "/workouts/crunches.jpg",
  },
];
