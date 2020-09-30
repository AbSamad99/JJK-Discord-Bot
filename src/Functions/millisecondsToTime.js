const millisecondsToTime=(s)=>{
  let seconds,minutes,hours,days,months,years,returnString;
  s=s/1000;
  seconds=Math.floor(s%60);
  s=s/60;
  minutes=Math.floor(s%60);
  s=s/60;
  hours=Math.floor(s%24);
  s=s/24;
  days=Math.floor(s%30.44);
  s=s/30.44;
  months=Math.floor(s%12);
  s=s/12;
  years=Math.floor(s%365.24);
  returnString=`${years?`${years}y`:''} ${months?`${months}m`:''} ${days?`${days}d`:''} ${hours?`${hours}h`:''} ${minutes?`${minutes}min`:''} ${seconds?`${seconds}s`:''}`
  
  return returnString.trim()
}

module.exports=millisecondsToTime