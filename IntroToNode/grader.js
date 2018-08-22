function average(list)
{ var sum=0,avg;
    for(var i=0;i<list.length;i++)
{ sum=sum+list[i];}
avg=(sum/(list.length)) ;
return Math.round(avg);}
var scores=[1,1.5];
console.log(average(scores));