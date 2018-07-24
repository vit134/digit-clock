#include <string.h>
 
 char sz[] = "Here; is some; sample;100;data;1.414;1020";
 void setup()
 {
 char *p = sz;
 char *str;
 Serial.begin(9600);
 while ((str = strtok_r(p, ";", &p)) != NULL) // delimiter is the semicolon
   Serial.println(str);
   }
    
    void loop(){}
     
     generates this output:
      
      Here
      is some
      sample
      100
      data
      1.414
      1020
