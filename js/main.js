window.onload = function() {
    $(function() {

        //1.顶部购物车的移入移出
        $(".cart").mouseenter(function() {
            $(".cart-menu").slideDown("fast");
        })
        $(".topbar-cart").mouseleave(function() {
            $(".cart-menu").slideUp("fast");
        })

        //2.顶部输入框的各种事件
        // $(".header-search").mouseenter(function() {
        //     $(".search-box,.search-btn").css("border", "1px solid #aaa");
        //     $(".search-box").css("border-right", "none");
        // })
        // $(".header-search").mouseleave(function() {
        //     $(".search-box,.search-btn").css("border", "1px solid #d0d0d0");
        //     $(".search-box").css("border-right", "none");
        // })

        // $(".search-box").focus(function() {
        //     $(".search-box,.search-btn").css("border", "1px solid #ff6700");
        //     $(".search-box").css("border-right", "none");
        //     $(".hotwords").css("display", "none");
        //     $(".search-items").css("display", "block");
        //     $(".header-search").unbind("mouseleave");
        //     $(".header-search").unbind("mouseenter");
        // })
        // $(".search-box").blur(function() {
        //     $(".search-box,.search-btn").css("border", "1px solid #d0d0d0");
        //     $(".search-box").css("border-right", "none");
        //     $(".hotwords").css("display", "block");
        //     $(".search-items").css("display", "none");
        //     $(".header-search").bind("mouseleave", function() {
        //         $(".search-box,.search-btn").css("border", "1px solid #d0d0d0");
        //         $(".search-box").css("border-right", "none");
        //     });
        //     $(".header-search").bind("mouseenter", function() {
        //         $(".search-box,.search-btn").css("border", "1px solid #aaa");
        //         $(".search-box").css("border-right", "none");
        //     });
        // })

        //3.监听顶部菜单的移入移出
        var timerF = null;
        var fla = 0;
        $(".header-nav,.nav-menu").mouseenter(function() {
            clearTimeout(timerF);
            $(".nav-menu").stop(true, true).slideDown(300);
        })
        $(".header-nav,.nav-menu").mouseleave(function() {
            timerF = setTimeout(function() {
                $(".nav-menu").stop(true, true).slideUp(300);
            }, 200);
        })

        $(".header-nav>ul>li").mouseenter(function() {
            $(".nav-menu ul").eq($(this).index()).show().siblings().hide();
        })

        //4.分类导航的移入移出
        $(".category>ul>li").mouseenter(function() {
            $(".children-list").show();
            $(".children-list").width($(".children-list>div>ul").width() * $(".children-list>div>ul").length);
            $(".children-list>div").eq($(this).index()).show().siblings().hide();
        })
        $(".category>ul>li").mouseleave(function() {
            $(".children-list").hide();
        })

        //5.轮播图的相关设置操作
        //5.1首先让第一张图片显示，其余隐藏
        var index = 0;
        $(".slider>ul>li").eq(0).show().siblings().hide();
        changeIndex();

        //5.2监听上一张按钮的点击
        $(".slider-direction .prev").click(function() {
            $(".slider>ul>li").eq(index).hide();
            index--;
            if (index < 0) {
                index = $(".slider>ul>li").length - 1;
            }
            $(".slider>ul>li").eq(index).fadeIn();
            changeIndex();
        })

        //5.3监听下一张按钮的点击
        $(".slider-direction .next").click(function() {
            autoPlay();
            changeIndex();
        })

        //5.4自动轮播
        function autoPlay() {
            $(".slider>ul>li").eq(index).hide();
            index++;
            if (index > $(".slider>ul>li").length - 1) {
                index = 0;
            }
            $(".slider>ul>li").eq(index).fadeIn();
            changeIndex();
        }

        var timer = setInterval(autoPlay, 2000);

        //5.5索引的改变
        function changeIndex() {
            $(".dots>a").eq(index).addClass("selected").siblings().removeClass("selected");
        }

        //5.6索引圆点的点击
        $(".dots>a").click(function() {
            $(".slider>ul>li").eq(index).hide();
            index = $(this).index();
            $(".slider>ul>li").eq(index).fadeIn();
            changeIndex();
        })

        //5.7轮播定时器的清除与设置
        $(".slider").mouseenter(function() {
            clearInterval(timer);
        })
        $(".slider").mouseleave(function() {
            timer = setInterval(autoPlay, 2000);
        })

        //6.监听闪购上一页下一页的点击
        var le = 0;
        $(".flash-next").click(function() {
            $(".flash-list>ul").animate({ marginLeft: "-=992px" }, 500);
            le -= 992;
            if (le < 0) {
                $(".flash-prev").removeClass("disabled");
            }
            if (le == 0) {
                $(".flash-prev").addClass("disabled");
            }
            if (le > -1984 && le < 0) {
                $(".flash-next").removeClass("disabled");
            }
            if (le == -1984) {
                $(".flash-next").addClass("disabled");
            }
        })
        $(".flash-prev").click(function() {
            $(".flash-list>ul").animate({ marginLeft: "+=992px" }, 500);
            le += 992;
            if (le < 0) {
                $(".flash-prev").removeClass("disabled");
            }
            if (le == 0) {
                $(".flash-prev").addClass("disabled");
            }
            if (le > -1984 && le < 0) {
                $(".flash-next").removeClass("disabled");
            }
            if (le == -1984) {
                $(".flash-next").addClass("disabled");
            }
        })

        //7.商品列表鼠标覆盖显示评论
        $(".col-4 ul li").hover(function() {
            $(this).find(".comments").stop(true, true).slideDown(200);
        }, function() {
            $(this).find(".comments").stop(true, true).slideUp(200);
        })

        //8.tab选项卡的切换
        $(".box-header .tab-list ul li").mouseenter(function() {
            $(this).addClass("tab-active").siblings().removeClass("tab-active");
            $(this).parents(".box-header").next().find("ul").eq($(this).index()).show().siblings().hide();
        })
        var cindex = 0;
        //9.内容轮播点击
        $(".next").click(function() {
            cindex++;
            if (cindex == 3) {
                cindex = 2;
            }
            $(this).parents(".ctl").prev().prev().find("ul").animate({
                marginLeft: [-256 * cindex, "swing"]
            }, 500);
            changeIndex();
        })

        $(".prev").click(function() {
            cindex--;
            if (cindex < 0) {
                cindex = 0;
            }
            $(this).parents(".ctl").prev().prev().find("ul").animate({
                marginLeft: [-256 * cindex, "swing"]
            }, 500);
            changeIndex();
        })

        $(".dots ul li").click(function() {
            cindex = $(this).index();
            $(this).parents(".dots").prev().find("ul").animate({
                marginLeft: [-256 * cindex, "swing"]
            }, 500);
            changeIndex();
        })

        function changeIndex() {
            $(".dots ul li").eq(cindex).addClass("li-active").siblings().removeClass("li-active");
        }

        //10.返回顶部
        $(".return-top").click(function() {
            $("body, html").animate({ scrollTop: 0 }, 500);
        })

        //11.登录tab
        $(".login-tab ul li a").click(function() {
            $(this).parent().addClass("login-active").siblings().removeClass("login-active");
            var tindex = $(this).parent().index();
            if (tindex == 0) {
                $(".tab-1").show();
                $(".tab-2").hide();
            } else {
                $(".tab-2").show();
                $(".tab-1").hide();
            }

        })
    })
}