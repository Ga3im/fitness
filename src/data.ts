export type exercisesType = {
  id: string;
  name: string;
  img: string;
};

export const data = {
  workouts: [
    {
      _id: "fullbody",
      description:
        " - комплексное занятие, прорабатывающее все основные группы мышц тела, она отлично подходит для новичков, экономии времени и частого тренировочного цикла, включая в себя базовые многосуставные упражнения",
      nameEN: "Fullbody",
      nameRU: "Фулбоди",
      order: 1,
      workouts: ["pullup", "pushup", "squat", "leglift"],
      img: "/img/fullbody.jpg",
      gym: false,
    },
    {
      _id: "pecstriceps",
      description:
        " - грудная мыщца самая большая и заметная мышца, она покрывает всю переднюю часть грудной клетки, придает объем и красоту, отвечают за приведение и сгибание рук, вращение плеча и дыхание. Трицепс - трехглавая мышца плеча, производит разгибание локтя, находится на задней стороне плечевой кости, один из основных двигательных мыщц руки",
      nameEN: "Pecs and triceps",
      nameRU: "Грудные мыщцы и трицепс",
      order: 2,
      workouts: ["pushup", "dips", "lyingdumbbellfly", "benchpress"],
      img: "/img/pecs.jpg",
      gym: false,
    },
  ],
};

export const result = [
  "проработка всех групп мышц",
  "  суставов",
  "улучшается циркуляция крови",
  "заряжают бодростью",
  "помогают противостоять стресса",
];

export const exercises = [
  {
    id: "pullup",
    name: "Подтягивание",
    img: "/workouts/pull-ups.jpg",
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
    id: "press",
    name: "Пресс",
    img: "/workouts/presslie.png",
  },
  {
    id: "hyperextension",
    name: "Гиперэкстен-зия",
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
    name: "Горизонталь-ная тяга",
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
];
