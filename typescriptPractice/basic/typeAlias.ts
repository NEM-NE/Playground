// 타입 별칭 (타입 엘리어스)

type Point = {
    x: number,
    y: number | string,
    z?: number,
}


type Point3 = Point & { // 상속의 개념이 아니라 둘 중 하나가 될 수 있다는 뜻
  z: number;
}