func_count=0;var subby="0";
var x = document.getElementsByTagName("body")[0].childNodes;
var txt,fText;
for(var i = 0; i < x.length; i++) 
{
	if (x[i].nodeName === "#text") 
	{
        	fText = x[i].nodeValue;
	}
}
for(var i = 0; i < x.length; i++) 
{
	if (x[i].nodeName === "#text") 
	{
       		x[i].parentNode.removeChild(x[i]);
    	}
}
if(fText!==undefined)
{
	fText = fText.replace(/\r?\n|\r/g,"");
	txt =  fText.split("$");
}
document.body.style.margin="0";
var box=document.createElement("box");
box.style.height="100vh";
box.style.width="100vw";
box.style.display="block";
document.body.appendChild(box);
var tgnm="box";
var funcs = [
    first_function,
    second_function,
    third_function,
    forth_function,
    fifth_function,
    sixth_function
]
if(fText!==undefined)
{
for(var i=0;i<txt.length;i++)
{
	var withwer="0";
	if(txt[i]!=="")
	{
		var make;
		var line=txt[i].split(" ");
		var check=0;
		for(var j=0;j<line.length;j++)
		{
			switch(line[j])
			{
				case "make":
				{
					check=1;
					make=document.createElement(line[j+1]);
					for(var mk=2;mk<4;mk++)
					{
						if(line[j+mk]!==undefined && line[j+mk]!=="undefined" && line[j+mk]!==null)
						{
							var chk=line[j+mk].split("=");
							if(chk[0]==="id")make.id=chk[1];
							else if(chk[0]==="class")make.className=chk[1];
						}	
					
					}
					break;
				}
			
				case "of":
				{
					var dimensions=line[j+1].split("*");
					make.style.height=dimensions[0];
					make.style.width=dimensions[1];
					break;
				}
				case "in":
				{		
					tgnm=line[j+1];
					break;
				}
				case "with":
				{
					check=2;withwer="1";
					document.getElementsByTagName(tgnm)[0].appendChild(make);
				
					for(var iwit=(j+1);iwit<line.length;iwit++)
					{
						if(line[iwit]==="where")break;
						var ic=line[iwit].split("(");
						var w=document.createElement(ic[0]);
						if(ic[1]!==undefined)
						{
							var ic2=ic[1].split(")");
							var ic3=ic2[0].split(";")
							if(ic2[1]==="")
							{	
								for(var mk=0;mk<(ic3.length)-1;mk++)
								{
									if(ic3[mk]!==undefined && ic3[mk]!=="undefined" && ic3[mk]!==null)
									{
										var chk=ic3[mk].split("=");
										var cross=chk[0].split("*");
										if(chk[0]==="id")w.id=chk[1];
										else if(chk[0]==="class")w.className=chk[1];
										else if(cross[1]!==null)
										{	
											w.style.height=cross[0];
											w.style.width=cross[1];
										}
									}	
								}
							}
						}
						document.getElementsByTagName(make.nodeName.toLowerCase())[0].appendChild(w);
					}
					break;	
				}
				case "remake":
				{
					if(line[j+2]==="having" && line[j+4]==="adding")
					{
						var iname=line[j+1];
						var iid=line[j+3].split("=");
						var mxx=document.getElementsByTagName(iname).length;
						for(var run=0;run<mxx;run++)
						{
							if(document.getElementsByTagName(iname)[run].id===iid[1])
							{
								var selected=document.getElementsByTagName(iname)[run];
								var toaddname=line[j+5].split("=");
								var toaddcontent=toaddname[1].split("|");
								for(var loc=j+6;loc<line.length;loc++)
								{
									toaddcontent[1]=toaddcontent[1]+" "+line[loc];
								}
								//toaddname[0] will have text
								//toaddcontent[1] will have textcontent
								switch(toaddname[0])
								{
									case "text":
									{
										selected.innerHTML=toaddcontent[1];
										break;	
									}
									case "image":
									{
										selected.style.backgroundImage = "url('"+toaddcontent[1]+"')"; 	
										selected.style.backgroundSize = "cover";
										break;	
									}									
								}
							}
						}
	
					}
					break;
				}
				case "where":
				{	
					if(withwer==="0")document.getElementsByTagName(tgnm)[0].appendChild(make);
					var dowill="0";
					do
					{
						if(dowill==="1")j=j+4;
						if(line[j+2]==="is" || line[j+2]==="are")
						{
							if(line[j+3]==="clickable")
							{
								if(line[j+1]==="all")
								{
									if(withwer==="1")
									{
										var divs=document.getElementsByTagName(make.nodeName.toLowerCase())[0].children;	
									}
									else if(withwer==="0")
									{
										var divs;
										divs[0]=make.nodeName.toLowerCase();
										
									}
									
								}
								else
								{
									if(withwer==="1")
									{
										var divs=line[j+1].split(",");	
									}
									else if(withwer==="0")
									{
										var divs;
										divs[0]=line[j+1];
										
									}
									
								}
								if(withwer==="1")
								{
									for(var wit=0;wit<divs.length;wit++)
									{
										if(line[j+1]==="all")var a=divs[wit].tagName.toLowerCase();
										else a=divs[wit];
										var butt=document.getElementsByTagName(a)[0];
										butt.innerHTML=a;
										butt.addEventListener("click", funcs[func_count], false);
										func_count++;
									}	
								}
								else if(withwer==="0")
								{
									a=divs[0];
									var butt=document.getElementsByTagName(a)[0];
									butt.innerHTML=a;
									butt.addEventListener("click", funcs[func_count], false);
									func_count++;
								}
								
							}
							else if(line[j+3]==="draggable")
							{
								if(line[j+1]==="all")
								{
									var divs=document.getElementsByTagName(make.nodeName.toLowerCase())[0].children;	
								}
								else
								{
									var divs=line[j+1].split(",");
								}
								for(var wit=0;wit<divs.length;wit++)
								{
									if(line[j+1]==="all")var a=divs[0].tagName.toLowerCase();//divs[wit]
									else a=divs[0];//divs[wit]
									var boxes = document.createElement(a+wit);
									var makenodenmlc=make.nodeName.toLowerCase();
									var content=document.getElementsByTagName(a)[0];
									content.ondblclick = calldrag(boxes,content,makenodenmlc);
								}
							}
						}
						if((line[j+2]==="takes" || line[j+2]==="take")&&(line[j+3]==="input"))
						{
							if(line[j+1]==="all")
							{
								var divs=document.getElementsByTagName(make.nodeName.toLowerCase())[0].children;	
							}
							else
							{
								var divs=line[j+1].split(",");
							}
							for(var wit=0;wit<divs.length;wit++)
							{
								if(line[j+1]==="all")var a=divs[wit].tagName.toLowerCase();
								else a=divs[wit];
								var ce=document.getElementsByTagName(a)[0];
								//ce.style.outline="thin solid grey";
								ce.setAttribute("contenteditable","true");
							}	
						}
						
						if(line[j+4] ==="and")dowill="1";
						else dowill="0";
					}
					while(dowill==="1");	
					break;check==="2";	
				}
			}
			
		}
		if(check===1)document.getElementsByTagName(tgnm)[0].appendChild(make);
		tgnm="box";
			
	}
}
}
//===================================================
function dragElement(elmnt) 
{
	var pos1, pos2, pos3, pos4;
	if (document.getElementById(elmnt.id)) 
	{
		document.getElementById(elmnt.id).onmousedown = dragMouseDown;
	} 
	else 
	{
		elmnt.onmousedown = dragMouseDown;
	}
	function dragMouseDown(e) 
	{
		if(elmnt.style.zIndex===null || elmnt.style.zIndex<=0 || elmnt.style.zIndex>=999)
		{
			elmnt.style.zIndex=0;
		}
		elmnt.style.zIndex +=5;
		e = e || window.event;
		e.preventDefault();
	    	pos3 = e.clientX;
    		pos4 = e.clientY;
    		document.onmouseup = closeDragElement;
    		document.onmousemove = elementDrag;
  	}
	function elementDrag(e) 
	{
    		e = e || window.event;
		e.preventDefault();
		pos1 = pos3 - e.clientX;
		pos2 = pos4 - e.clientY;
		pos3 = e.clientX;
		pos4 = e.clientY;
		elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
		elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
	}
	function closeDragElement() 
	{
		elmnt.style.zIndex -=4;
		document.onmouseup = null;
		document.onmousemove = null;
		elmnt.position = "static";
	}
}
function calldrag(boxes,content,makenodenmlc)
{
	boxes.style.display="inline-block";//inline
	boxes.style.cssFloat="Left";
	boxes.style.marginLeft="auto";boxes.style.marginRight="auto";
	content.style.cssFloat="none";content.style.cssFloat="none";
	document.getElementsByTagName(makenodenmlc)[0].appendChild(boxes);
	var child=document.adoptNode(content);
	boxes.appendChild(child);
	boxes.style.height=content.style.height;boxes.style.width=content.style.width;
	content.style.position="absolute";
	boxes.style.marginTop=0;
	boxes.style.marginLeft=0;
	content.style.marginTop=0;
	content.style.marginLeft=0;
	dragElement(content);
}
if(document.getElementsByTagName("codecontent1")[0]!==undefined)
{
	document.getElementsByTagName("codecontent1")[0].style.outline="thin solid grey";
	document.getElementsByTagName("codecontent")[0].addEventListener("keyup", callcolorer);
	document.getElementsByTagName("codecontent")[0].addEventListener("paste", callerer);
	var paster="notpasted";
	// addEventListener support for IE8
        function bindEvent(element, eventName, eventHandler) {
            if (element.addEventListener){
                element.addEventListener(eventName, eventHandler, false);
            } else if (element.attachEvent) {
                element.attachEvent('on' + eventName, eventHandler);
            }
        }
	var xframe = document.createElement("IFRAME");
	xframe.setAttribute("height","99%");
	xframe.setAttribute("width","99%");
	xframe.id='the_iframe';
	//xframe.contentWindow.location = xframe.src;
	xframe.setAttribute("sandbox","allow-same-origin allow-scripts allow-popups allow-forms");
 	xframe.setAttribute("src", "./iframe.html");
  	document.getElementsByTagName("outputpane")[0].appendChild(xframe);
	// Send a message to the child iframe
        var iframeEl = document.getElementById('the_iframe'),
            messageButton = document.getElementById('subut');
            
        // Send a message to the child iframe
        var sendMessage = function(msg) {
            // Make sure you are sending a string, and to stringify JSON
            iframeEl.contentWindow.postMessage(msg, '*');
        };
        // Send random messge data on every button click
        bindEvent(messageButton, 'click', function (e) {
            var random = Math.random();
	var liki="";//liki='<script src="Script.js"></script><link rel="stylesheet" href="user_customizable.css"></style>';
            sendMessage('' + document.getElementsByTagName("codecontent")[0].textContent + liki);
        });
	//***************

        

}
function callerer()
{
	setTimeout(callcolorer, 50);
	paster="pasted";
}
function callcolorer()
{
	
	if(paster==="notpasted")var x89 = event.which || event.keyCode;
	if(x89===32 || x89===13 || x89===17 || paster==="pasted")
	{	paster="notpasted";
		var cc=document.getElementsByTagName("codecontent")[0];
		cc.setAttribute("spellcheck","false");
		cc.focus();
		var clines=cc.innerHTML.split("$");//alert(clines);
		for(var clinest=1;clinest<clines.length;clinest++)
		{	
			
			var cwords=clines[clinest].split(" ");
			var ttttt="0";
			for(var cwrst=0;cwrst<cwords.length;cwrst++)
			{	
				cwords[cwrst]=cwords[cwrst].trim();
				if(cwords[cwrst]==="<span")
				{
					ttttt="1";
				}
				else if(ttttt==="1")
				{
					var rarar=cwords[cwrst].split(">");
					if(rarar[2]!==undefined)
					{
						rarar[2]=rarar[2].replace("&nbsp;", "");
					}
					cwords[cwrst]=rarar[2];
					ttttt="0";
					
				}
				if(cwords[cwrst]===undefined)
				{
					cwords[cwrst]=cwords[cwrst+2];
					if(cwords[cwrst]!==undefined)var rarar=cwords[cwrst].split(">");
					if(rarar[2]!==undefined)
					{
						var rre=new RegExp("&nbsp;", 'g');
						rarar[2]=rarar[2].replace(rre, "");
					}
					cwords[cwrst]=rarar[2];
				}
				if(ttttt!=="1")
				{	//alert(cwords[cwrst]);
					if(cwrst===(cwords.length-1))cwords[cwrst]=cwords[cwrst].replace("&nbsp;", "");
					//alert(cwords[cwrst]);var choicer=["","",""];
					if(cwords[cwrst]!==undefined)choicer=cwords[cwrst].split("=");
					//alert(choicer[0]);
					var arer="0";
					if(choicer[0]==="style")
					{
						choicer[0]=choicer[1];
						arer="1";
					}
					//alert(choicer[0]);
					choicer[0]=choicer[0].replace(new RegExp("<br>",'g'), "");
					choicer[0]=choicer[0].replace(new RegExp("<br",'g'), "");
					choicer[0]=choicer[0].replace(new RegExp("&nbsp;",'g'), "");
					choicer[0]=choicer[0].replace(new RegExp("</div>",'g'), "");
					choicer[0]=choicer[0].replace(new RegExp("<div>",'g'), "");
					//alert(choicer[0]);
					var spanneri=choicer[0].split("</span>");
					if(arer==="1")choicer[0]=spanneri[1];
					//alert(choicer[0]);
					if(choicer[0]!==undefined)
					{
					switch(choicer[0])
					{
						case "make": 
						{
							coler(cc,choicer[0],"1");//alert("2");
							break;
						}
						case "remake": 
						{
							coler(cc,choicer[0],"1");
							break;
						}
						case "with": 
						{
							coler(cc,choicer[0],"1");
							break;
						}
						case "where": 
						{
							coler(cc,choicer[0],"1");
							break;
						}
						case "in": 
						{
							coler(cc,choicer[0],"1");
							break;
						}
						case "having": 
						{
							coler(cc,choicer[0],"1");
							break;
						}
						case "adding": 
						{
							coler(cc,choicer[0],"1");
							break;
						}
						case "and": 
						{
							coler(cc,choicer[0],"1");
							break;
						}
						case "class": 
						{
							coler(cc,choicer[0],"2");
							break;
						}
						case "id": 
						{
							coler(cc,choicer[0],"2");
							break;
						}
						case "is": 
						{
							coler(cc,choicer[0],"3");
							break;
						}
						case "all": 
						{
							coler(cc,choicer[0],"3");
							break;
						}
						case "are": 
						{
							coler(cc,choicer[0],"3");
							break;
						}
						case "take": 
						{
							coler(cc,choicer[0],"3");
							break;
						}
						case "takes": 
						{
							coler(cc,choicer[0],"3");
							break;
						}
						case "input": 
						{
							coler(cc,choicer[0],"3");
							break;
						}
						case "clickable": 
						{
							coler(cc,choicer[0],"3");
							break;
						}
						case "draggable": 
						{
							coler(cc,choicer[0],"3");
							break;
						}
						case "text": 
						{
							coler(cc,choicer[0],"4");
							break;
						}
						case "image": 
						{
							coler(cc,choicer[0],"4");
							break;
						}
						
						
					}
					
					}										
				}
								
			}
		}
	}
}
//===================================================
function coler(cc,sas,ch)
{
	var cd=cc.innerHTML;
	if(ch==="1")	
	{
		var cd1="<span contenteditable='false' style='color:red;'>"+sas+"</span>";
	}
	else if(ch==="2")	
	{
		var choicy=sas.split("=");
		var cd1="<span contenteditable='false' style='color:green;'>"+choicy[0]+"</span>";
		//cd1=cd1+"="+choicy[1];
	}
	else if(ch==="3")	
	{
		var cd1="<span contenteditable='false' style='color:blue;'>"+sas+"</span>";
	}
	else if(ch==="4")	
	{
		var choicy=sas.split("=");
		var cd1="<span contenteditable='false' style='color:pink;'>"+choicy[0]+"</span>";
		//cd1=cd1+"="+choicy[1];
		//alert(cd1);
	}
	var re=new RegExp("("+sas+")", 'g');
	var re1=new RegExp("<div>", 'g');
	var re2=new RegExp("</div>", 'g');
	cd=cd.replace(new RegExp("&#8203;",'g'), "");
	cd=cd.replace(new RegExp("\\b"+sas+"\\b",'g'), cd1);
	cd=cd.replace(re1, "");
	cd=cd.replace(re2, "");
	if(ch==="4")	
	{
		cd1=cd1+"|";
		cd=cd.replace(cd1, "");
	}
	cc.innerHTML=cd;
	cc.focus();
	setEndOfContenteditable(cc);
	
	
}
function setEndOfContenteditable(contentEditableElement)
{
    var range,selection;
    if(document.createRange)//Firefox, Chrome, Opera, Safari, IE 9+
    {
        range = document.createRange();
	range.selectNodeContents(contentEditableElement);	
	range.collapse(false);
	selection = window.getSelection();
	selection.removeAllRanges();
	selection.addRange(range);
    }
    else if(document.selection)//IE 8 and lower
    { 
        range = document.body.createTextRange();
        range.moveToElementText(contentEditableElement);
        range.collapse(false);
        range.select();
    }
}
// addEventListener support for IE8
        function bindEvent(element, eventName, eventHandler) {
            if (element.addEventListener) {
                element.addEventListener(eventName, eventHandler, false);
            } else if (element.attachEvent) {
                element.attachEvent('on' + eventName, eventHandler);
            }
        }
        
        var results = document.getElementsByTagName("box")[0],
            messageButton = document.getElementById('subut');
        // Listen to messages from parent window
        bindEvent(window, 'message', function (e) {
            results.innerHTML = e.data;
        });
        
function first_function()
{
	//alert(document.getElementsByTagName("codecontent")[0].textContent);	
}

function second_function(){alert("hi 2");}
function third_function(){alert("hi 3");}
function forth_function(){alert("hi 4");}
function fifth_function(){alert("hi 5");}
function sixth_function(){alert("hi 6");}