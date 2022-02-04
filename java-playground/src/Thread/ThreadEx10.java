package Thread;

/*

    데몬쓰레드는 쓰레드를 setDaemon(true)를 통해 만들 수 있으며
    쓰레드를 보조하는 보조 쓰레드이다.(그래서 쓰레드가 없어지면 자동적으로 종료)
    주로 자동 저장 같은 기능을 만들 때 사용

 */

public class ThreadEx10 implements Runnable{
    static boolean autoSave = false;

    public static void main(String[] args) {
        Thread t = new Thread(new ThreadEx10());
        t.setDaemon(true);
        t.start();

        for(int i = 0; i < 10; i++){
            try {
                Thread.sleep(1000);
                System.out.println(i);
                if(i == 5) autoSave = true;
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        }
    }

    @Override
    public void run() {
        while(true) {
            try {
                Thread.sleep(3000);
                if(autoSave) autoSave();
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        }
    }

    public void autoSave() {
        System.out.println("autoSave!!!!");
    }
}
