package Thread;

import javax.swing.*;

/*
    쓰레드가 잠시 멈췄을 때 interrupt()을 호출하면 sleep()에서 에러 발생 & isInterrupted는 false로 초기화
 */

public class ThreadEx14 {
    public static void main(String[] args) {
        MyThread thread = new MyThread();
        thread.start();

        String input = JOptionPane.showInputDialog("입력해주세요.");
        System.out.println(input);
        thread.interrupt();
        System.out.println(thread.isInterrupted());
    }

    static class MyThread extends Thread {
        public void run() {
            int i = 10;
            while(i != 0 && !isInterrupted()){
                System.out.println(i--);
                try {
                    Thread.sleep(1000);
                } catch (InterruptedException e) {
                    interrupt();
                }
            }
        }
    }
}
