package Thread;

public class ThreadEx19 {
    static long startTime = 0;
    public static void main(String[] args) {
        MyThread th1 = new MyThread();
        MyThread2 th2 = new MyThread2();

        th1.start();
        th2.start();
        long startTime = System.currentTimeMillis();

        try {
            th1.join();
            th2.join();
        } catch (InterruptedException e) {
            e.printStackTrace();
        }

        System.out.println(System.currentTimeMillis() - ThreadEx19.startTime);
    }

    static class MyThread extends Thread {
        public void run(){
            for(int i = 0; i < 300; i++){
                System.out.print(new String("-"));
            }
            System.out.println();
        }
    }

    static class MyThread2 extends Thread {
        public void run(){
            for(int i = 0; i <300; i++){
                System.out.print(new String("|"));
            }
            System.out.println();
        }
    }
}
