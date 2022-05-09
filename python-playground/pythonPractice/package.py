import package.sound.echo

package.sound.echo.echo_test();

from package.sound import echo

echo.echo_test();

from package.sound import *

echo.echo_test(); # 에러 발생!

# 하위 패키지 요소들은 안불러와지는데 이 때 __init__으로 지정해줘야 한다.