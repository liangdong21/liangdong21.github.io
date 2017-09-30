/* Extension demonstrating a blocking reporter block */
/* Sayamindu Dasgupta <sayamindu@media.mit.edu>, May 2014 */


new (function() {
    var ext = this;
    // // Cleanup function when the extension is unloaded
    ext._shutdown = function() {
      // alert("该设备已卸载！");
    };

    // // Status reporting code
    // // Use this to report missing hardware, plugin or unsupported browser
    ext._getStatus = function() {
        return {status: 2, msg: 'Ready'};
    };

    ext.createCMD1 = function(name,action,pin,devId,callback) {
        if(action=="开"){
            action="on";
        }
        if(action=="关"){
            action="off";
        }
        if(name=="继电器"){
            name="relay";
        }
        if(name=="LED"){
            name="led";
        }
        if(name=="激光"){
            name="laser";
        }
        if(action=="获取"){
            action="get";
        }
        if(name=="土壤湿度"){
            name="soilhumidity";
        }
        if(name=="火焰"){
            name="flame";
        }
        if(name=="烟雾"){
            name="mq5";
        }
        if(name=="光敏"){
            name="lightsense";
        }
        if(name=="声音检测"){
            name="sounddetect";
        }
        if(name=="人体接触"){
            name="bodycontact";
        }
        if(name=="按键开关"||name=="水银开关"||name=="光遮断开关"||name=="倾斜开关"||name=="弹片开关"||name=="霍尔开关"){
            name="digitalswitch";
        }
        if(name=="震动开关"||name=="敲击开关"){
            name="vibrationswitch";
        }
        if(name=="温度"){
            name="ds18b20";
        }
        if(name=="循迹"){
            name="trace";
        }
        if(name=="避障"){
            name="avoidblock";
        }
        var descrp=action+" "+pin;

        console.log(name+descrp);
        $.ajax({
                type:"POST",
                url:"http://makers.iclass.cn/api/scratch/scodeC",
                dataType:"json",
                data:{
                    name:name,
                    descrption:descrp,
                    device_id:devId
                },
                success:function(data){
                    console.log(data);
                    var cmdId=data.data.id;
                    var answer="";
                    var status=0;
                    var count=0;
                    var timer=setInterval(function(){
                    $.ajax({
                        type:"GET",
                        url:"http://makers.iclass.cn/api/scratch/scode_scratchR?id="+cmdId,
                         async:false,
                        dataType:"json",
                        success:function(data){
                            console.log(data);
                            status=data.data.rows[0].status;
                            answer=data.data.rows[0].answer;
                            console.log(status);
                        },
                        error:function(jqXHR){
                            console.log(jqXHR);
                        }
                    });
                    count++;
                    console.log(count);
                    if(count>60){
                        clearInterval(timer);
                        answer="请求时间已超时！";
                        console.log(timer);
                        callback(answer);
                    }
                    if(status==1){
                        clearInterval(timer);
                        callback(Math.round(answer));
                    }
                },2000);
                },
                error:function(jqXHR){
                    console.log(jqXHR);
                    console.log(jqXHR.status);
                }
            });
    };
    // ext.createCMD2 = function(name,action,zappername,buttonname,devId,callback) {
    //
    //     if(action=="发射"){
    //         action="emit";
    //     }
    //     if(name=="红外线"){
    //         name="ir_emitter";
    //     }
    //     if(zappername=="TV"){
    //         zappername="tv";
    //     }
    //     if(buttonname=="电源"){
    //         buttonname="power";
    //     }
    //     if(buttonname=="音量加"){
    //         buttonname="v+";
    //     }
    //     if(buttonname=="音量减"){
    //         buttonname="v-";
    //     }
    //     var descrp=action+" "+zappername+" "+buttonname;
    //
    //     // var descrp=JSON.stringify(descrp);
    //     console.log(descrp);
    //     $.ajax({
    //             type:"POST",
    //             url:"http://www.bit-dream.com/api/scodeC",
    //             dataType:"json",
    //             data:{
    //                 name:name,
    //                 descrption:descrp,
    //                 device_id:devId
    //             },
    //             success:function(data){
    //                 console.log(data);
    //                 //devicename=data.data.name;
    //                 var cmdId=data.data.id;
    //                 var answer="";
    //                 var status=0;
    //                 var count=0;
    //                 var timer=setInterval(function(){
    //                 $.ajax({
    //                     type:"GET",
    //                     url:"http://www.bit-dream.com/api/scode_scratchR?id="+cmdId,
    //                      async:false,
    //                     dataType:"json",
    //                     success:function(data){
    //                         console.log(data);
    //                         status=data.data.rows[0].status;
    //                         answer=data.data.rows[0].answer;
    //                         console.log(status);
    //                     },
    //                     error:function(jqXHR){
    //                         console.log(jqXHR);
    //                     }
    //                 });
    //                 count++;
    //                 console.log(count);
    //                 if(count>60){
    //                     clearInterval(timer);
    //                     answer="请求时间已超时！";
    //                     console.log(timer);
    //                     callback(answer);
    //                 }
    //                 if(status==1){
    //                     clearInterval(timer);
    //                     callback(Math.round(answer));
    //                 }
    //             },2000);
    //             },
    //             error:function(jqXHR){
    //                 console.log(jqXHR);
    //                 console.log(jqXHR.status);
    //             }
    //         });
    // };
    //
    ext.createCMD3 = function(name,action,pin,type,devId,callback) {

        var descrp="";
        if(action=="获取"){
            action="get";
        }
        if(type=="温度"){
            descrp=action+" "+pin+" 0";
        }
        if(type=="湿度"){
            descrp=action+" "+pin+" 1";
        }
        if(name=="空气温湿度"){
            name="dht";
        }

        // var descrp=JSON.stringify(descrp);
        console.log(descrp);
        $.ajax({
                type:"POST",
                url:"http://makers.iclass.cn/api/scratch/scodeC",
                dataType:"json",
                data:{
                    name:name,
                    descrption:descrp,
                    device_id:devId
                },
                success:function(data){
                    console.log(data);
                    //devicename=data.data.name;
                    var cmdId=data.data.id;
                    var answer="";
                    var status=0;
                    var count=0;
                    var timer=setInterval(function(){
                    $.ajax({
                        type:"GET",
                        url:"http://makers.iclass.cn/api/scratch/scode_scratchR?id="+cmdId,
                         async:false,
                        dataType:"json",
                        success:function(data){
                            console.log(data);
                            status=data.data.rows[0].status;
                            answer=data.data.rows[0].answer;
                            console.log(status);
                        },
                        error:function(jqXHR){
                            console.log(jqXHR);
                        }
                    });
                    count++;
                    console.log(count);
                    if(count>60){
                        clearInterval(timer);
                        answer="请求时间已超时！";
                        console.log(timer);
                        callback(answer);

                    }
                    if(status==1){
                        clearInterval(timer);
                        callback(Math.round(answer));
                    }
                },2000);
                },
                error:function(jqXHR){
                    console.log(jqXHR);
                    console.log(jqXHR.status);
                }
            });
    };
    //
     ext.faceDetect=function(name,file_name,action,devId,callback){
         var descrp="";
         if(name=="人脸识别"){
             name="face_detect";
         }
         if(action=="检测情绪"){
             action="emotion";
         }
         if(action=="检测年龄"){
             action="age";
         }
         if(action=="检测性别"){
             action="gender";
         }
         if(action=="检测种族"){
             action="ethnicity";
         }
         if(action=="检测笑容程度"){
             action="smiling";
         }
         if(action=="检测颜值"){
        	 action = "beauty";
         }
         descrp=action;
         console.log(descrp);
         $.ajax({
                 type:"POST",
                 url:"http://makers.iclass.cn/api/scratch/scodeC",
                 dataType:"json",
                 data:{
                     name:name,
                     descrption:descrp,
                     device_id:devId
                 },
                 success:function(data){
                     console.log(data);
                     //devicename=data.data.name;
                     var cmdId=data.data.id;
                     var answer="";
                     var status=0;
                     var count=0;
                     var timer=setInterval(function(){
                     $.ajax({
                         type:"GET",
                         url:"http://makers.iclass.cn/api/scratch/scodeE?id="+cmdId+"&filename="+file_name,
                          async:false,
                         dataType:"json",
                         success:function(data){
                             console.log(data+"123");
                             status=data.status;
                             answer=data.answer;
                             console.log(status);
                         },
                         error:function(jqXHR){
                             console.log(jqXHR);
                         }
                     });
                     count++;
                     console.log(count);
                     if(count>60){
                         clearInterval(timer);
                         answer="请求时间已超时！";
                         console.log(timer);
                         callback(answer);
    
                     }
                     if(status==1){
                         clearInterval(timer);
                         callback(answer);
                     }
                 },2000);
                 },
                 error:function(jqXHR){
                     console.log(jqXHR);
                     console.log(jqXHR.status);
                 }
             });
         
    
     };
    //
    // ext.faceLearn=function(name,action,uname,fname,devId,callback){
    //     var descrp="";
    //     if(name=="人脸学习"){
    //         name="face_detect";
    //     }
    //     if(action=="学习"){
    //         action="learn_face";
    //     }
    //     if(uname==""){
    //         callback("请填写人名！");
    //     }
    //     if(fname==""){
    //         callback("请填写图片名！");
    //     }
    //     if(uname!=""&&fname!=""){
    //         descrp=action+" "+uname+" "+fname;
    //     console.log(descrp);
    //     $.ajax({
    //             type:"POST",
    //             url:"http://www.bit-dream.com/api/scodeC",
    //             dataType:"json",
    //             data:{
    //                 name:name,
    //                 descrption:descrp,
    //                 device_id:devId
    //             },
    //             success:function(data){
    //                 console.log(data);
    //                 //devicename=data.data.name;
    //                 var cmdId=data.data.id;
    //                 var answer="";
    //                 var status=0;
    //                 var count=0;
    //                 var timer=setInterval(function(){
    //                 $.ajax({
    //                     type:"GET",
    //                     url:"http://www.bit-dream.com/api/scode_scratchR?id="+cmdId,
    //                      async:false,
    //                     dataType:"json",
    //                     success:function(data){
    //                         console.log(data);
    //                         status=data.data.rows[0].status;
    //                         answer=data.data.rows[0].answer;
    //                         console.log(status);
    //                     },
    //                     error:function(jqXHR){
    //                         console.log(jqXHR);
    //                     }
    //                 });
    //                 count++;
    //                 console.log(count);
    //                 if(count>60){
    //                     clearInterval(timer);
    //                     answer="请求时间已超时！";
    //                     console.log(timer);
    //                     callback(answer);
    //
    //                 }
    //                 if(status==1){
    //                     clearInterval(timer);
    //                     callback(answer);
    //                 }
    //             },2000);
    //             },
    //             error:function(jqXHR){
    //                 console.log(jqXHR);
    //                 console.log(jqXHR.status);
    //             }
    //         });
    //     }
    //
    // };
    //
  
     
     ext.faceRec=function(name,action,devId,callback){
         var descrp="";
         var answer="";
         if(name=="控制版块"){
             name="control_model";
         }
         if(action=="打开摄像头"){
             action="start_camera";
             answer= new Date().getDate();
             layer.open({
        		 type: 2,
        		  skin: 'layui-layer-rim', //加上边框
        		  area: ['750px', '430px'], //宽高
        		  title:'摄像头',
        		  content: '/ScratchController/camera',
        		  btn: ['确定', '取消'],  
        		  yes:function(index){
        			  
        			  layer.close(index);
        	        },
        	        no:function(index){
        	        	
        	            layer.close(index);
        	        }
            })
            callback(answer);
         }
         if(action=="打开录音"){
             action="start_record";
             ScratchSound();
             answer = new Date().getDate();
             callback(answer);
         }
         descrp=action;
         console.log(descrp);
         /*$.ajax({
                 type:"POST",
                 url:"http://makers.iclass.cn/api/scratch/scodeC",
                 dataType:"json",
                 data:{
                     name:name,
                     descrption:descrp,
                     device_id:devId
                 },
                 success:function(data){
                	 
                    console.log(data);
                    
                    
                     //devicename=data.data.name;
                     var cmdId=data.data.id;
                     var answer="";
//                     var status=0;
                     var count=0;
                     var timer=setInterval(function(){
                    	 
                     $.ajax({
                         type:"GET",
                         url:"http://makers.iclass.cn/api/scratch/scodeD?id="+cmdId,
                          async:false,
                         dataType:"json",
                         success:function(data){
                             console.log(data);
                             status=data.status;
                             answer=data.answer;
                             console.log(status);
                         },
                         error:function(jqXHR){
                             console.log(jqXHR);
                         }
                     });
                     count++;
                     console.log(count);
                     if(count>60){
                         clearInterval(timer);
                         answer="请求时间已超时！";
                         console.log(timer);
                         callback(answer);
    
                     }
                     if(status==1){
                         clearInterval(timer);
                         callback(answer);
                     }
                 },2000);
                 },
                 error:function(jqXHR){
                     console.log(jqXHR);
                     console.log(jqXHR.status);
                 }
             });*/
     };
    //
    // //发送预警短信
    // ext.sendMsgs=function(tel,category,val,callback){
    //
    //     var mubanId="79349";
    //     var descrp=tel+","+mubanId+","+category+","+Math.round(val);
    //     console.log(descrp);
    //     console.log("hh");
    //     $.ajax({
    //             type:"POST",
    //             url:"http://www.bit-dream.com/api/scodeC",
    //             dataType:"json",
    //             data:{
    //                 name:"sms",
    //                 descrption:descrp,
    //                 device_id:1
    //             },
    //             success:function(data){
    //                 console.log(data);
    //                 callback("预警短信已发送！");
    //             },
    //             error:function(jqXHR){
    //                 console.log(jqXHR);
    //                 console.log(jqXHR.status);
    //             }
    //         });
    // };
    //
    // //获取设备个数
    ext.getDevice=function(callback){
        $.ajax({
            type:"GET",
            url:"http://makers.iclass.cn/api/scratch/device_scR",
            dataType:"json",
            success:function(data){
                console.log(data);
                callback(data.data.count);
            },
            error:function(jqXHR){
                console.log(jqXHR);
            }
        });
    };
    //
    // //获取设备id
    // ext.getDeviceId=function(index,callback){
    //     $.ajax({
    //         type:"GET",
    //         url:"http://www.bit-dream.com/api/device_scR",
    //         dataType:"json",
    //         success:function(data){
    //             console.log(data);
    //             if(index<=data.data.count){
    //                 var deviceId=data.data.rows[index-1].id;
    //                 callback(deviceId);
    //             }else{
    //                 callback("已超过您拥有的设备个数！");
    //             }
    //
    //         },
    //         error:function(jqXHR){
    //             console.log(jqXHR);
    //         }
    //     });
    // }
    //
    // //获取天气预报
    // ext.weather_forecast=function(city,days,wea_data,callback){
    //     $.ajax({
    //         type:"POST",
    //         url:"http://www.bit-dream.com/api/scodeC",
    //         dataType:"json",
    //         data:{
    //             name:"weather",
    //             descrption:city,
    //             device_id:1
    //         },
    //         success:function(data){
    //             console.log(data);
    //             var weather_status=data["HeWeather data service 3.0"][0].status;
    //             if(weather_status=="ok"){
    //                 var weather_day=data["HeWeather data service 3.0"][0].daily_forecast[days];
    //                 switch(wea_data){
    //                     case "最高气温":
    //                         callback(weather_day.tmp.max);
    //                         break;
    //                     case "最低气温":
    //                         callback(weather_day.tmp.min);
    //                         break;
    //                     case "相对湿度":
    //                         callback(weather_day.hum+'%');
    //                         break;
    //                     case "能见度":
    //                         callback(weather_day.vis+'km');
    //                         break;
    //                     case "风力":
    //                         callback(weather_day.wind.sc);
    //                         break;
    //                     case "风向":
    //                         callback(weather_day.wind.dir);
    //                         break;
    //                     case "风速":
    //                         callback(weather_day.wind.spd+'kmph');
    //                         break;
    //                     case "降水量":
    //                         callback(weather_day.pcpn+'mm');
    //                         break;
    //                     case "白天天气状况":
    //                         callback(weather_day.cond.txt_d);
    //                         break;
    //                     case "夜间天气状况":
    //                         callback(weather_day.cond.txt_n);
    //                         break;
    //                     default:
    //                         break;
    //                 }
    //             }else if(weather_status=="unknown city"){
    //                 callback("城市名输入有误，请重新输入!")
    //             }                },
    //             error:function(jqXHR){
    //                 console.log(jqXHR);
    //                 console.log(jqXHR.status);
    //             }
    //         });
    // };
    //
    // //获取实时天气
    // ext.weather_cur=function(city,wea_data,callback){
    //     $.ajax({
    //         type:"POST",
    //         url:"http://www.bit-dream.com/api/scodeC",
    //         dataType:"json",
    //         data:{
    //             name:"weather",
    //             descrption:city,
    //             device_id:1
    //         },
    //         success:function(data){
    //             console.log(data);
    //             var weather_status=data["HeWeather data service 3.0"][0].status;
    //             if(weather_status=="ok"){
    //                 var weather_cur=data["HeWeather data service 3.0"][0].now;
    //                 var weather_aqi=data["HeWeather data service 3.0"][0].aqi;
    //                 switch(wea_data){
    //                     case "天气状况":
    //                         callback(weather_cur.cond.txt);
    //                         break;
    //                     case "体感温度":
    //                         callback(weather_cur.fl);
    //                         break;
    //                     case "相对湿度":
    //                         callback(weather_cur.hum+'%');
    //                         break;
    //                     case "降水量":
    //                         callback(weather_cur.pcpn+'mm');
    //                         break;
    //                     case "气压":
    //                         callback(weather_cur.pres);
    //                         break;
    //                     case "温度":
    //                         callback(weather_cur.tmp);
    //                         break;
    //                     case "能见度":
    //                         callback(weather_cur.vis+'km');
    //                         break;
    //                     case "风力":
    //                         callback(weather_cur.wind.sc);
    //                         break;
    //                     case "风向":
    //                         callback(weather_cur.wind.dir);
    //                         break;
    //                     case "风速":
    //                         callback(weather_cur.wind.spd+'kmph');
    //                         break;
    //                     case "空气质量":
    //                         if(weather_aqi){
    //                             callback(weather_aqi.city.qlty);
    //                         }else{
    //                             callback("该城市现在没有空气质量数据！");
    //                         }
    //                         break;
    //                     case "PM2.5":
    //                         if(weather_aqi){
    //                             callback(weather_aqi.city.pm25+'ug/m³');
    //                         }else{
    //                             callback("该城市现在没有PM2.5数据！");
    //                         }
    //                         break;
    //                     default:
    //                         break;
    //                 }
    //                 callback("success!");
    //             }else if(weather_status=="unknown city"){
    //                 callback("城市名输入有误，请重新输入!")
    //             }                },
    //             error:function(jqXHR){
    //                 console.log(jqXHR);
    //                 console.log(jqXHR.status);
    //             }
    //         });
    // };
    //
    // //读取引脚
    ext.getPin=function(name,pin,devId,callback){
        var descrp="";
        action="get";

        if(name=="数字引脚"){
            name="digitalRead";
        }else{
            name="analogRead";
        }

        descrp=action+" "+pin;
        console.log(name+" "+descrp);
        $.ajax({
                type:"POST",
                url:"http://makers.iclass.cn/api/scratch/scodeC",
                dataType:"json",
                data:{
                    name:name,
                    descrption:descrp,
                    device_id:devId
                },
                success:function(data){
                    console.log(data);
                    //devicename=data.data.name;
                    var cmdId=data.data.id;
                    var answer="";
                    var status=0;
                    var count=0;
                    var timer=setInterval(function(){
                    $.ajax({
                        type:"GET",
                        url:"http://makers.iclass.cn/api/scratch/scode_scratchR?id="+cmdId,
                         async:false,
                        dataType:"json",
                        success:function(data){
                            console.log(data);
                            status=data.data.rows[0].status;
                            answer=data.data.rows[0].answer;
                            console.log(status);
                        },
                        error:function(jqXHR){
                            console.log(jqXHR);
                        }
                    });
                    count++;
                    console.log(count);
                    if(count>60){
                        clearInterval(timer);
                        answer="请求时间已超时！";
                        console.log(timer);
                        callback(answer);
                    }
                    if(status==1){
                        clearInterval(timer);
                        callback(Math.round(answer));
                    }
                },2000);
                },
                error:function(jqXHR){
                    console.log(jqXHR);
                    console.log(jqXHR.status);
                }
            });

    };
    //
    // //设置引脚
    ext.setPin=function(name,pin,pin_val,devId,callback){
        var descrp="";
        action="set";

        if(name=="数字引脚"){
            if(pin_val!==0&&pin_val!==1){
                callback("设置数字引脚的值只能为0或者1！");
                return;
            }
            name="digitalWrite";
        }else{
            name="analogWrite";
        }

        descrp=action+" "+pin+" "+pin_val;
        console.log(name+" "+descrp);
        $.ajax({
                type:"POST",
                url:"http://makers.iclass.cn/api/scratch/scodeC",
                dataType:"json",
                data:{
                    name:name,
                    descrption:descrp,
                    device_id:devId
                },
                success:function(data){
                    console.log(data);
                    //devicename=data.data.name;
                    var cmdId=data.data.id;
                    var answer="";
                    var status=0;
                    var count=0;
                    var timer=setInterval(function(){
                    $.ajax({
                        type:"GET",
                        url:"http://makers.iclass.cn/api/scratch/scode_scratchR?id="+cmdId,
                         async:false,
                        dataType:"json",
                        success:function(data){
                            console.log(data);
                            status=data.data.rows[0].status;
                            answer=data.data.rows[0].answer;
                            console.log(status);
                        },
                        error:function(jqXHR){
                            console.log(jqXHR);
                        }
                    });
                    count++;
                    console.log(count);
                    if(count>60){
                        clearInterval(timer);
                        answer="请求时间已超时！";
                        console.log(timer);
                        callback(answer);
                    }
                    if(status==1){
                        clearInterval(timer);
                        callback(Math.round(answer));
                    }
                },2000);
                },
                error:function(jqXHR){
                    console.log(jqXHR);
                    console.log(jqXHR.status);
                }
            });
    }
    //
     //语音识别
     ext.soundDet=function(file_name,devId,callback){
         var descrp="";
         var name="sound_detect";
         var action="sound_identify";
    
    
         descrp=file_name;
         console.log(name+" "+descrp);
         $.ajax({
                 type:"POST",
                 url:"http://makers.iclass.cn/api/scratch/scodeC",
                 dataType:"json",
                 data:{
                     name:name,
                     descrption:descrp,
                     device_id:devId
                 },
                 success:function(data){
                     console.log(data);
                     var cmdId=data.data.id;
                     var answer="";
                     var status=0;
                     var count=0;
                     var timer=setInterval(function(){
                     $.ajax({
                         type:"GET",
                         url:"http://makers.iclass.cn/api/scratch/scodeG?id="+cmdId,
                          async:false,
                         dataType:"json",
                         success:function(data){
                             console.log(data);
                             status=data.status;
                             answer=data.answer;
                             console.log(status);
                         },
                         error:function(jqXHR){
                             console.log(jqXHR);
                         }
                     });
                     count++;
                     console.log(count);
                     if(count>60){
                         clearInterval(timer);
                         answer="请求时间已超时！";
                         console.log(timer);
                         callback(answer);
                     }
                     if(status==1){
                         clearInterval(timer);
                         callback(answer);
                     }
                 },2000);
                 },
                 error:function(jqXHR){
                     console.log(jqXHR);
                     console.log(jqXHR.status);
                 }
             });
     }
    
    // //语音录音
    // ext.soundRec=function(devId,callback){
    //     var descrp="";
    //     var name="sound_detect";
    //     var action="start_record";
    //
    //
    //     descrp=action;
    //     console.log(name+" "+descrp);
    //     $.ajax({
    //             type:"POST",
    //             url:"http://www.bit-dream.com/api/scodeC",
    //             dataType:"json",
    //             data:{
    //                 name:name,
    //                 descrption:descrp,
    //                 device_id:devId
    //             },
    //             success:function(data){
    //                 console.log(data);
    //                 var cmdId=data.data.id;
    //                 var answer="";
    //                 var status=0;
    //                 var count=0;
    //                 var timer=setInterval(function(){
    //                 $.ajax({
    //                     type:"GET",
    //                     url:"http://www.bit-dream.com/api/scode_scratchR?id="+cmdId,
    //                      async:false,
    //                     dataType:"json",
    //                     success:function(data){
    //                         console.log(data);
    //                         status=data.data.rows[0].status;
    //                         answer=data.data.rows[0].answer;
    //                         console.log(status);
    //                     },
    //                     error:function(jqXHR){
    //                         console.log(jqXHR);
    //                     }
    //                 });
    //                 count++;
    //                 console.log(count);
    //                 if(count>60){
    //                     clearInterval(timer);
    //                     answer="请求时间已超时！";
    //                     console.log(timer);
    //                     callback(answer);
    //                 }
    //                 if(status==1){
    //                     clearInterval(timer);
    //                     callback(answer);
    //                 }
    //             },2000);
    //             },
    //             error:function(jqXHR){
    //                 console.log(jqXHR);
    //                 console.log(jqXHR.status);
    //             }
    //         });
    // }
    //
    // //pwm
    ext.pwmSet=function(pin,pin_val,devId,callback){
        var descrp="";
        var name="pwm";
        var action="set";

        if(pin_val<0||pin_val>255){
            callback("请输入0-255之间的引脚值！");
            return;
        }
        descrp=action+" "+pin+" "+pin_val;
        $.ajax({
                type:"POST",
                url:"http://makers.iclass.cn/api/scratch/scodeC",
                dataType:"json",
                data:{
                    name:name,
                    descrption:descrp,
                    device_id:devId
                },
                success:function(data){
                    console.log(data);
                    var cmdId=data.data.id;
                    var answer="";
                    var status=0;
                    var count=0;
                    var timer=setInterval(function(){
                    $.ajax({
                        type:"GET",
                        url:"http://makers.iclass.cn/api/scratch/scode_scratchR?id="+cmdId,
                         async:false,
                        dataType:"json",
                        success:function(data){
                            console.log(data);
                            status=data.data.rows[0].status;
                            answer=data.data.rows[0].answer;
                            console.log(status);
                        },
                        error:function(jqXHR){
                            console.log(jqXHR);
                        }
                    });
                    count++;
                    console.log(count);
                    if(count>60){
                        clearInterval(timer);
                        answer="请求时间已超时！";
                        console.log(timer);
                        callback(answer);
                    }
                    if(status==1){
                        clearInterval(timer);
                        callback(answer);
                    }
                },2000);
                },
                error:function(jqXHR){
                    console.log(jqXHR);
                    console.log(jqXHR.status);
                }
            });

    }
    //
    // //发射红外线模块
    // ext.ir_set=function(pin,devId,callback){
    //     var descrp="";
    //     var name="ir";
    //     var action="set";
    //
    //     descrp=action+" "+pin;
    //     console.log(name+" "+descrp);
    //     $.ajax({
    //             type:"POST",
    //             url:"http://www.bit-dream.com/api/scodeC",
    //             dataType:"json",
    //             data:{
    //                 name:name,
    //                 descrption:descrp,
    //                 device_id:devId
    //             },
    //             success:function(data){
    //                 console.log(data);
    //                 var cmdId=data.data.id;
    //                 var answer="";
    //                 var status=0;
    //                 var count=0;
    //                 var timer=setInterval(function(){
    //                 $.ajax({
    //                     type:"GET",
    //                     url:"http://www.bit-dream.com/api/scode_scratchR?id="+cmdId,
    //                      async:false,
    //                     dataType:"json",
    //                     success:function(data){
    //                         console.log(data);
    //                         status=data.data.rows[0].status;
    //                         answer=data.data.rows[0].answer;
    //                         console.log(status);
    //                     },
    //                     error:function(jqXHR){
    //                         console.log(jqXHR);
    //                     }
    //                 });
    //                 count++;
    //                 console.log(count);
    //                 if(count>60){
    //                     clearInterval(timer);
    //                     answer="请求时间已超时！";
    //                     console.log(timer);
    //                     callback(answer);
    //                 }
    //                 if(status==1){
    //                     clearInterval(timer);
    //                     callback(answer);
    //                 }
    //             },2000);
    //             },
    //             error:function(jqXHR){
    //                 console.log(jqXHR);
    //                 console.log(jqXHR.status);
    //             }
    //         });
    // }
    // //语音合成
     ext.audioSyn = function (para, devId, callback) {
         var descrp='';
         var name = 'text2audio';
         var action = 'text2audio';
         if (para == '') {
             callback('语音合成片段不能为空！');
         }
         else {
        	 console.log(para);
             
                 descrp = para;
                 $.ajax({
                     type:"POST",
                     url:"http://makers.iclass.cn/api/scratch/scodeC",
                     dataType:"json",
                     data:{
                         name:name,
                         descrption:descrp,
                         device_id:devId
                     },
                     success:function(data){
                         console.log(data);
                         var cmdId=data.data.id;
                         var answer="";
                         var status=0;
                         var count=0;
                         var timer=setInterval(function(){
                             $.ajax({
                                 type:"GET",
                                 url:"http://makers.iclass.cn/api/scratch/scodeF?id="+cmdId,
                                 async:false,
                                 dataType:"json",
                                 success:function(data){
                                     console.log(data);
                                     status=data.status;
                                     answer=data.answer;
                                     var audio = new Audio(answer);
                                     answer="合成成功";
                                     audio.play();
                                  
                                     console.log(status);
                                 },
                                 error:function(jqXHR){
                                     console.log(jqXHR);
                                 }
                             });
                             count++;
                             console.log(count);
                             if(count>60){
                                 clearInterval(timer);
                                 answer="请求时间已超时！";
                                 console.log(timer);
                                 callback(answer);
                             }
                             if(status==1){
                                 clearInterval(timer);
                                 callback(answer);
                             }
                         },2000);
                     },
                     error:function(jqXHR){
                         console.log(jqXHR);
                         console.log(jqXHR.status);
                     }
                 });
             
         }
     }
    //
    // //声音播放
    // ext.soundPlay = function (para, devId, callback) {
    //     var descrp = '';
    //     var name = 'playsound';
    //     var action = 'playsound';
    //     if (!para) {
    //         callback('请输入文件名称！');
    //     }
    //     else {
    //         var mp3Flag = isMp3(para);
    //         if (!mp3Flag) {
    //             callback('请输入mp3格式文件！');
    //         }
    //         else {
    //             descrp = action + ' ' + para;
    //             console.log(name + descrp);
    //             $.ajax({
    //                 type:"POST",
    //                 url:"http://www.bit-dream.com/api/scodeC",
    //                 dataType:"json",
    //                 data:{
    //                     name:name,
    //                     descrption:descrp,
    //                     device_id:devId
    //                 },
    //                 success:function(data){
    //                     console.log(data);
    //                     var cmdId=data.data.id;
    //                     var answer="";
    //                     var status=0;
    //                     var count=0;
    //                     var timer=setInterval(function(){
    //                         $.ajax({
    //                             type:"GET",
    //                             url:"http://www.bit-dream.com/api/scode_scratchR?id="+cmdId,
    //                             async:false,
    //                             dataType:"json",
    //                             success:function(data){
    //                                 console.log(data);
    //                                 status=data.data.rows[0].status;
    //                                 answer=data.data.rows[0].answer;
    //                                 console.log(status);
    //                             },
    //                             error:function(jqXHR){
    //                                 console.log(jqXHR);
    //                             }
    //                         });
    //                         count++;
    //                         console.log(count);
    //                         if(count>60){
    //                             clearInterval(timer);
    //                             answer="请求时间已超时！";
    //                             console.log(timer);
    //                             callback(answer);
    //                         }
    //                         if(status==1){
    //                             clearInterval(timer);
    //                             callback(answer);
    //                         }
    //                     },2000);
    //                 },
    //                 error:function(jqXHR){
    //                     console.log(jqXHR);
    //                     console.log(jqXHR.status);
    //                 }
    //             });
    //         }
    //     }
    // }
    //
    // //判断是否是中文
    // function isChn(str) {
    //     var reg=/[^\u4E00-\u9FA5]/;
    //     if (reg.test(str)) {
    //         return false;
    //     }
    //     else {
    //         return true;
    //     }
    // }
    //
    // //判断是否是mp3文件
    // function isMp3(str) {
    //     var reg =/\S+(\.mp3)$/;
    //     if (reg.test(str)) {
    //         return true;
    //     }
    //     else {
    //         return false;
    //     }
    // }
    //
    // //移动机械手
    // ext.moveMachine = function (x, y, devId, callback) {
    //     if (x < 0 || x > 300 || y < 0 || y > 300) {
    //         callback('请输入0-300之间的值！');
    //     }
    //     else {
    //         var name = 'moveXY';
    //         var action = 'move';
    //         var xVal = 'X' + x;
    //         var yVal = 'Y' + y;
    //         var descrp = action + ' ' + 'G1' + ' ' + xVal + ' ' + yVal;
    //         $.ajax({
    //             type:"POST",
    //             url:"http://www.bit-dream.com/api/scodeC",
    //             dataType:"json",
    //             data:{
    //                 name: name,
    //                 descrption: descrp,
    //                 device_id:devId
    //             },
    //             success:function(data){
    //                 console.log(data);
    //                 var cmdId=data.data.id;
    //                 var answer="";
    //                 var status=0;
    //                 var count=0;
    //                 var timer=setInterval(function(){
    //                     $.ajax({
    //                         type:"GET",
    //                         url:"http://www.bit-dream.com/api/scode_scratchR?id="+cmdId,
    //                         async:false,
    //                         dataType:"json",
    //                         success:function(data){
    //                             console.log(data);
    //                             status=data.data.rows[0].status;
    //                             answer=data.data.rows[0].answer;
    //                             console.log(status);
    //                         },
    //                         error:function(jqXHR){
    //                             console.log(jqXHR);
    //                         }
    //                     });
    //                     count++;
    //                     console.log(count);
    //                     if(count>60){
    //                         clearInterval(timer);
    //                         answer="请求时间已超时！";
    //                         console.log(timer);
    //                         callback(answer);
    //                     }
    //                     if(status==1){
    //                         clearInterval(timer);
    //                         callback(answer);
    //                     }
    //                 },2000);
    //             },
    //             error:function(jqXHR){
    //                 console.log(jqXHR);
    //                 console.log(jqXHR.status);
    //             }
    //         });
    //     }
    // }
    //
    // //点击遥控器
    // ext.clickRemote = function (devId, callback) {
    //     var name = 'moveXY';
    //     var action = 'click';
    //     var descrp = action + ' ' + 'click';
    //     $.ajax({
    //         type:"POST",
    //         url:"http://www.bit-dream.com/api/scodeC",
    //         dataType:"json",
    //         data:{
    //             name: name,
    //             descrption: descrp,
    //             device_id:devId
    //         },
    //         success:function(data){
    //             console.log(data);
    //             var cmdId=data.data.id;
    //             var answer="";
    //             var status=0;
    //             var count=0;
    //             var timer=setInterval(function(){
    //                 $.ajax({
    //                     type:"GET",
    //                     url:"http://www.bit-dream.com/api/scode_scratchR?id="+cmdId,
    //                     async:false,
    //                     dataType:"json",
    //                     success:function(data){
    //                         console.log(data);
    //                         status=data.data.rows[0].status;
    //                         answer=data.data.rows[0].answer;
    //                         console.log(status);
    //                     },
    //                     error:function(jqXHR){
    //                         console.log(jqXHR);
    //                     }
    //                 });
    //                 count++;
    //                 console.log(count);
    //                 if(count>60){
    //                     clearInterval(timer);
    //                     answer="请求时间已超时！";
    //                     console.log(timer);
    //                     callback(answer);
    //                 }
    //                 if(status==1){
    //                     clearInterval(timer);
    //                     callback(answer);
    //                 }
    //             },2000);
    //         },
    //         error:function(jqXHR){
    //             console.log(jqXHR);
    //             console.log(jqXHR.status);
    //         }
    //     });
    // }
    //
    // //复位机械手
    // ext.resetMachine = function (devId, callback) {
    //     var name = 'moveXY';
    //     var action = 'gohome';
    //     var descrp = action + ' ' + 'G28';
    //     $.ajax({
    //         type:"POST",
    //         url:"http://www.bit-dream.com/api/scodeC",
    //         dataType:"json",
    //         data:{
    //             name: name,
    //             descrption: descrp,
    //             device_id:devId
    //         },
    //         success:function(data){
    //             console.log(data);
    //             var cmdId=data.data.id;
    //             var answer="";
    //             var status=0;
    //             var count=0;
    //             var timer=setInterval(function(){
    //                 $.ajax({
    //                     type:"GET",
    //                     url:"http://www.bit-dream.com/api/scode_scratchR?id="+cmdId,
    //                     async:false,
    //                     dataType:"json",
    //                     success:function(data){
    //                         console.log(data);
    //                         status=data.data.rows[0].status;
    //                         answer=data.data.rows[0].answer;
    //                         console.log(status);
    //                     },
    //                     error:function(jqXHR){
    //                         console.log(jqXHR);
    //                     }
    //                 });
    //                 count++;
    //                 console.log(count);
    //                 if(count>60){
    //                     clearInterval(timer);
    //                     answer="请求时间已超时！";
    //                     console.log(timer);
    //                     callback(answer);
    //                 }
    //                 if(status==1){
    //                     clearInterval(timer);
    //                     callback(answer);
    //                 }
    //             },2000);
    //         },
    //         error:function(jqXHR){
    //             console.log(jqXHR);
    //             console.log(jqXHR.status);
    //         }
    //     });
    // };
    //
    // //ZX手势传感器
    // ext.ZXgesture = function (devId, callback) {
    //     var name = 'ZXgesture';
    //     var descrp = 'get';
    //     $.ajax({
    //         type:"POST",
    //         url:"http://www.bit-dream.com/api/scodeC",
    //         dataType:"json",
    //         data:{
    //             name: name,
    //             descrption: descrp,
    //             device_id:devId
    //         },
    //         success:function(data){
    //             console.log(data);
    //             var cmdId=data.data.id;
    //             var answer="";
    //             var status=0;
    //             var count=0;
    //             var timer=setInterval(function(){
    //                 $.ajax({
    //                     type:"GET",
    //                     url:"http://www.bit-dream.com/api/scode_scratchR?id="+cmdId,
    //                     async:false,
    //                     dataType:"json",
    //                     success:function(data){
    //                         console.log(data);
    //                         status=data.data.rows[0].status;
    //                         answer=data.data.rows[0].answer;
    //                         console.log(status);
    //                     },
    //                     error:function(jqXHR){
    //                         console.log(jqXHR);
    //                     }
    //                 });
    //                 count++;
    //                 console.log(count);
    //                 if(count>60){
    //                     clearInterval(timer);
    //                     answer="请求时间已超时！";
    //                     console.log(timer);
    //                     callback(answer);
    //                 }
    //                 if(status==1){
    //                     clearInterval(timer);
    //                     callback(answer);
    //                 }
    //             },2000);
    //         },
    //         error:function(jqXHR){
    //             console.log(jqXHR);
    //             console.log(jqXHR.status);
    //         }
    //     });
    // };

    // Block and block menu descriptions
    var descriptor = {
        blocks: [
            ['R', '获取设备个数','getDevice'],
            ['R', '获取第%n 个设备的设备号','getDeviceId',1],
            ['w', '传感器： %m.name1 命令： %m.action1  引脚: D %m.PIN1 序列号： %n', 'createCMD1', "LED","开",0,0],
            ['R', '传感器 %m.name2 命令%m.action2 引脚: A%m.PIN2 序列号 %n', 'createCMD1', "土壤湿度","获取",0,1],
            //['R', '指令名称 %m.name3 执行动作 %m.action3 遥控器名称 %m.zappername  按钮类型 %m.buttonname 设备号 %n', 'createCMD2', "红外线","发射","TV","电源",1],
            ['R', '传感器 %m.name4 命令 %m.action2 引脚: D %m.PIN1 序列号 %n', 'createCMD1', "按键开关","获取",0,1],
            ['R', '传感器 %m.name5 命令 %m.action2  引脚: D %m.PIN1 类型 %m.type 序列号 %n','createCMD3',"空气温湿度","获取",0,"温度",1],
            ['w', 'PWM模块 引脚 %n 引脚值 %n 序列号 %n','pwmSet', 0,0,1],
            ['R', '读取%m.name9  引脚 %n 序列号 %n', 'getPin', "数字引脚",0,1],
            ['R', '设置 %m.name9  引脚 %n 数值 %n 序列号 %n', 'setPin', "数字引脚",0,0,1],
            ['R', '指令名称 %m.name6 图片名称%s 执行动作 %m.action4  设备号 %n','faceDetect',"人脸识别","","检测情绪",1],
//            ['R', '指令名称 %m.name7 执行动作 %m.action5 人名 %s 图片名 %s 设备号 %n','faceLearn',"人脸学习","学习","","",1],
            ['R', '指令名称 %m.name8 执行动作 %m.action6 设备号 %n','faceRec',"控制版块","打开摄像头",1],
//            ['R', '手机号 %s 传感器类别 %s 传感器值 %s', 'sendMsgs','','',''],
//            ['R', '天气预报 城市 %s   %m.day 天后  预报值%m.weather_data','weather_forecast',"beijing",0,"最高气温"],
//            ['R', '实时天气 城市 %s  查询值%m.weather_current','weather_cur',"beijing","天气状况"],            
//            ['R', '语音录音 设备号 %n', 'soundRec',1],
            ['R', '语音识别 文件名 %s 设备号 %n', 'soundDet',"",1],      
            ['R', '语音合成 语音片段 %s 设备号 %n', 'audioSyn', '',1],
            //['R', '声音播放 文件名 %s 设备号 %n', 'soundPlay', '',1],
            //['R', '发射红外线 引脚号 %n 设备号 %n','ir_set',0,1],
            //['R', '移动机械手 X %n Y %n 设备号 %n', 'moveMachine', 100, 101, 1],
            //['R', '点击遥控器 设备号 %n', 'clickRemote', 1],
            //['R', '复位机械手 设备号 %n', 'resetMachine', 1],
            //['R', 'ZX手势传感器 设备号 %n', 'ZXgesture', 1]
        ],
         menus: {
          name1: ['继电器', 'LED', '激光','七彩led灯'],
          name2: ['土壤湿度','火焰','光敏','人体接触','烟雾'],
          //name3: ['红外线'],
          name4:['按键开关','水银开关','光遮断开关','倾斜开关','弹片开关','霍尔开关','震动开关','敲击开关','声音检测','温度','循迹','避障'],
          name5:['空气温湿度'],
          name6:['人脸识别'],
          name7:['人脸学习'],
          name8:['控制版块'],
          name9:['数字引脚','模拟引脚'],
          action1:['开','关'],
          action2:['获取'],
          action3:['发射'],
          action4:['检测情绪','检测年龄','检测性别','检测种族','检测笑容程度','检测颜值'],
          action5:['学习'],
          action6:['打开摄像头','打开录音'],
          PIN1:[0,1,2,3,4,5,6,7,8,9,10,11,12,13],
          PIN2:[0],
          zappername:['TV'],
          buttonname:['电源','音量加','音量减'],
          type:['温度','湿度'],
          day:[0,1,2,3,4,5,6,7,8,9],
          weather_data:['相对湿度','能见度','最高气温','最低气温','风力','风向','风速','降水量','白天天气状况','夜间天气状况'],
          weather_current:['天气状况','体感温度','相对湿度','降水量','气压','温度','能见度','风向','风力','风速','空气质量','PM2.5']
        },
    };

    // Register the extension
    // ScratchExtensions.register('demo', descriptor, ext);
    $(document).on('ScratchExtensions:config',function(){
        ScratchExtensions.register('中科极客', descriptor, ext);
    })
    setTimeout(function(){
        $(document).trigger('ScratchExtensions:config')
    },2000)
})();
//http://101.201.152.195/my_extension.j
