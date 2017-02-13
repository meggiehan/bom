#rgba 和 hlsa
 我们通过hlsa也可以对颜色的透明度进行控制
	H：
		Hue(色调)。0(或360)表示红色，120表示绿色，240表示蓝色，也可	取其他数值来指定颜色。取值为： 0 - 360
	S：
		Saturation(饱和度)。取值为：0.0% - 100.0%
	L：
		Lightness(亮度)。取值为：0.0% - 100.0%
	A：
		Alpha透明度。取值0~1之间。
-----------------------------------------------------------------
###渐变
-介绍比较简单的内容，稍微提一下。
 怎么理解渐变？渐渐的变化，
-----------------------------------------------------------------
#过渡
刚刚开始的时候，我敢肯定没你们都分不清这些单词：这个非常重要
-trans ：是一个词根：
transition：过渡
transform：转换
translate：移动
transparent：透明
rotate():旋转
skew():倾斜
	第一：首先需要说明的是skew的默认原点transform-origin是这个物件的中心点
	第二：x方向正值是逆时针旋转；
	第三：y方向正值是顺时针旋转；
scale()：缩放
transform-origin():原点


##安卓
 - 盒子的塌陷
  - overflow：hidden；
  - 给父盒子家边框
 - before after 的使用
 - 居中处理 

##居中方式
 - table 默认vertical-align ：
 - 模拟table 加：vertical-align 
 - middle对齐 span：display：inline-block；vertical-align：middle；
 - margin：
 - translate：