package Thread;

public class ThreadEx20 {
    public static void main(String[] args) {
        MyThread thread = new MyThread();
        thread.setDaemon(true);
        thread.start();

        int requiredMemory = 0;
        for(int i = 0; i < 20; i++){
            requiredMemory = (int)(Math.random() * 10) * 20;

            if(thread.getFreeMemory() < requiredMemory || thread.getFreeMemory() < thread.getTotalMemory() * 0.4){
                thread.interrupt();
                try {
                    thread.join(100);
                } catch (InterruptedException e) {}
            }

            thread.usedMemory += requiredMemory;
            System.out.println(thread.usedMemory);
        }
    }

    static class MyThread extends Thread {
        final static int MAX_MEMORY = 1000;
        int usedMemory = 0;

        public void run() {
            while(true){
                try {
                    Thread.sleep(10 * 1000);
                } catch (InterruptedException e) {
                    System.out.println("awaken by interrupt!");
                }
                gc();
                System.out.println("garbage collect!" + getFreeMemory());
            }
        }

        public void gc() {
            usedMemory -= 300;
            if(usedMemory < 0) usedMemory = 0;
        }

        public int getTotalMemory() {
            return MAX_MEMORY;
        }

        public int getFreeMemory() {
            return MAX_MEMORY - usedMemory;
        }
    }
}
