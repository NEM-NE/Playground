package Thread;

import javax.swing.*;

/*
    메세지를 입력 받는 동시에 카운트를 세줌
 */

public class ThreadEx6 {
    public static void main(String[] args) {
        Runnable myThread = new MyThread();
        Thread thread = new Thread(myThread);
        thread.start();

        String input = JOptionPane.showInputDialog("아무 값이나 입력하세요.");
        System.out.println("입력하신 값은 " + input + "입니다.");
    }

    static class MyThread implements Runnable {

        @Override
        public void run() {
            for(int i = 0; i < 10; i++){
                try {
                    System.out.println(i);
                    Thread.sleep(1000);
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
            }
        }
    }
}
