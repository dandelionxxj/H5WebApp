/* 散点图表组件对象 */

var H5ComponentPoint=function(name,cfg){
    var component=new H5ComponentBase(name,cfg);
    var base=cfg.data[0][1];//以第一个数据的比例为基准

    $.each(cfg.data,function(idx,item){
        var point=$('<div class="point point_'+idx+'">');
        var name=$('<div class="name">'+item[0]+'</div>');
        var rate=$('<div class="per">'+(item[1]*100)+'%</div>');

        name.append(rate);
        point.append(name);
        var per=(item[1]/base*100)+'%';
        point.width(per).height(per);
        if(item[2]){
            point.css('background-color',item[2]);
        }
        if(item[3]!=undefined&&item[4]){
           // point.css('left',item[3]).css('top',item[4]);
            //1.暂存left、top值到元素上，用jquery的data方法
            point.data('left',item[3]).data('top',item[4]);
        }
        //2.设置zIndex、重置位置
        point.css('zIndex',100-idx);
        point.css('left',0).css('top',0);
        // point.css('transform','scale(.1)');
        //3.设置动画
        point.css('transition','all 1s '+idx*.5+'s');

        component.append(point);
    });
    // 4.入场动画，取出位置，并加到css中
    component.on('onLoad',function(){
       component.find('.point').each(function(idx,item){
           $(item).css('left',$(item).data('left')).css('top',$(item).data('top'));
       });
        return false;
    });
    // 5.退场动画，回到原始的位置
    component.on('onLeave',function(){
        component.find('.point').each(function(idx,item){
            $(item).css('left',0).css('top',0);
        });
        return false;
    });
    component.find('.point').on('click',function(){
        component.find('.point').removeClass('point_focus');
        $(this).addClass('point_focus');
        return false;
    }).eq(0).addClass('point_focus');

    return component
};