/*
 * Author: Michael Faber
 * Date Created: 12/27/2016
 * simpleSlideShow jQuery Plugin
*/

import jQuery from "jquery";
(function ( $ ) {
 
    $.fn.simpleSlideShow = function(options) {

        //initialize JS
        var index = 0;
        var urls = [];
        if(options.urls != undefined && options.urls.length > 1) 
        {
            urls = options.urls;
        } 
        else 
        {
            console.log("simpleSlideShow: invalid value for urls, you can't have a slideshow without any photos!")
            return;
        }

        //default duration: 8 seconds
        var time = 8;
        if(options.time != undefined) 
        {
            if(options.time <= 0) 
            {
                console.log("simpleSlideShow: invalid time, choose integer value larger than 1 second");
                return;
            }

            time = options.time;
        }

        //default transition time: 1 second
        var transition = 10;
        if(options.transition != undefined && options.transition >= 0) {
            transition = options.transition;
        }

        var max = (urls.length - 1);

        //initialize HTML
        var imgHTMLend = "' height='100%' width='100%' alt='simpleSlideShow element' </img>";
        var firstImgHTML = "<img value='0'" + "class='simpleSlideShowElement' src='" + urls[0] + imgHTMLend;
        this.append(firstImgHTML);

        for(let i = 1; i <= max; i++) 
        {
            var imgHTML = "<img value='" + i + "' class='simpleSlideShowElement' src='" + urls[i] + imgHTMLend;
            this.append(imgHTML);
        }

        $('.simpleSlideShowElement').each(function() {
            if($(this).attr('value') != 0) {
                $(this).hide();
            }
        });

        //rotate images
        setInterval(function() {

            $('.simpleSlideShowElement').each(function() {

                //hide current image
                if($(this).attr('value') == index) 
                {
                    $(this).hide();
                } 

                //show next image
                if($(this).attr('value') == (index + 1)) 
                {
                    $(this).fadeIn(transition*100);
                }

                //special case of last image to first image
                if(index == max)
                {
                    if($(this).attr('value') == max) 
                    {
                        $(this).hide();
                    }

                    if($(this).attr('value') == 0)
                    {
                        $(this).fadeIn(transition*100);
                    }
                }
            });
            
            if(index == max) 
            {
                index = 0;
            }
            else 
            {
                index++;
            }

        }, 1000*time);

        return this;
    }

}( jQuery ));