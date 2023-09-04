import fs from "fs";
import inquirer from "inquirer";
import readline from 'readline';
import {execSync} from "child_process";
//Input Time and Command

var _question = [
  {
   type: "number",
   name: "min",
   message: "Nhập phút: ",
   default: '*',
   validate: (min) => {
   if(min > 60 || min < 0) {
     return 'Nhập lại!';
   }
   return true;
   }
 },
 {
   type: "input",
   name: "hour",
   message: "Nhập giờ: ",
   default: '*',
   validate: (hour) => {
    if(hour > 23 || hour < 0) {
       return 'Nhập lại!';
     }
     return true;
   }
 },
 {
   type: "input",
   name: "day",
   message: "Nhập ngày trong tháng: ",
   default: '*',
   validate: (day) => {
     if(day > 31 || day < 0) {
        return 'Nhập lại!';
      }
      return true;
    }
 },
 {
   type: "input",
   name: "month",
   message: "Nhập tháng: ",
   default: '*',
   validate: (month) => {
     if(month >  12|| month < 0) {
        return 'Nhập lại!';
      }
      return true;
    }
 },
 {
   type: "list",
   name: "weekday",
   message: "Nhập ngày trong tuần",
   choices: ['0','1','2','3', '4', '5', '6']
 },
 {
   type: "input",
   name: "command",
   message: "Nhập lệnh",
   default: 'echo null'
 },
]



export function add() {
  return inquirer
  .prompt(_question)
  .then((answers) => { 
    var answer = answers.min.toString() + " " + answers.hour.toString() + 
      " " + answers.day.toString() + " " + answers.month.toString() + 
      " " + answers.weekday.toString() + " " + answers.command.toString();
    execSync('(crontab -l ; echo "'+answer+'") 2>&1 | grep -v "no crontab" | sort | uniq | crontab -', 
     { encoding: 'utf-8' })
    const output = execSync('crontab -l',{ encoding: 'utf-8' })
    console.log('Output was:\n', output);
   
  });
}




export function remove() {
  var choice = []
  const n = execSync("crontab -l | sed '/^\s*#/d;/^\s*$/d' | wc -l",{ encoding: 'utf-8' })
  if (n > 0) {
    for (var i = 1 ; i<=n; i++) {
      choice.push (i+". "+execSync("crontab -l | sed '/^\s*#/d;/^\s*$/d' | sed -n '"+i+"p'",{ encoding: 'utf-8' }))
    }
    inquirer
    .prompt([{
     type: "list",
     name: "com",
     message: "Chọn lệnh: ",
     choices: choice,
    }])
  .then((answers) => { 
    var answer = answers.com.toString();
    let letter = answer.charAt(0);
    execSync('crontab -l |sed  "'+letter+'d" |crontab -', 
     { encoding: 'utf-8' })
    const output = execSync('crontab -l',{ encoding: 'utf-8' })
    console.log('Output was:\n', output);
  })
 }else {
  console.log ("(Ko có lệnh nào đc đặt )");
 }}



 export function removeAll() {
    const output = execSync('crontab -r',{ encoding: 'utf-8' })
    console.log ("(Ko có lệnh nào đc đặt )")
 }

 

 export function list() {
  const n = execSync("crontab -l | sed '/^\s*#/d;/^\s*$/d' | wc -l",{ encoding: 'utf-8' })
  if (n > 0) {
    const output = execSync('crontab -l',{ encoding: 'utf-8' })
    console.log('Output was:\n', output);
  }else {
    console.log ("(Ko có lệnh nào đc đặt )")
  }
 }

 

