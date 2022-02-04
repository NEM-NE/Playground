package Thread;

/*

   쓰레드 팁
   1. extends는 1개 밖에 못하기 때문에 일반적으로 Runnable 사용 (객체지향적 사용법)
   2. 생성된 쓰레드는 재사용 불가
   3. start()는 새로운 호출스택을 만들어 run()을 실행 / run()은 이미 존재하는 호출 스택에 그냥 실행
   4. 실행 중인 호출스택이 아무것도 없을 때 프로그램은 종료된다. => main이 종료되어도 다른 호출스택이 존재하면 프로그램 종료 x
   5. 상굴스레드인 노드와는 다르게 하나의 스레드가 죽어도 프로그램에는 지장이 없는듯
   6. 스레드에 우선순위를 둘 수 있지만 사실상 별 의미가 없고 차라리 우선 작업에 pq를 사용하는 것이 나을 수도 있음
 */

public class ThreadEx1 {
    public static void main(String[] args) {
        MyThread thread = new MyThread();

        Runnable runnable = new MyThread2();
        Thread thread2 = new Thread(runnable);
        thread2.setPriority(10);    // 우선 순위 결정

        thread.start();
        thread2.start();
    }

    static class MyThread extends Thread {
        public void run() {
            for(int i = 0; i < 5; i++){
                System.out.println("extends thread : " + getName());
            }
        }
    }

    static class MyThread2 implements Runnable {
        @Override
        public void run() {
            try {
                for(int i = 0; i < 5; i++){
                    System.out.println("implements Runnable : " + Thread.currentThread().getName());
                }
                throw new Exception();
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
    }
}
