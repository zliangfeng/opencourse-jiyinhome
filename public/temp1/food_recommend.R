
###############
options(stringsAsFactors = FALSE)

################
args = commandArgs(trailingOnly=TRUE)

#req <- args[1]
req="Ca~600___Fe~11___Zn~6___VA~180___VD~10___VA~0.18___VD~10___VE~6___Folate~0.2"
myreq<-unlist(strsplit(req,"___"))
myreq_v<-vector()
for(i in 1:length(myreq))
{x<-unlist(strsplit(myreq[i],"~"))
 myreq_v[x[1]]<-as.numeric(x[2])
}
myreq_v_perday<-myreq_v/7

#cat(names(myreq_v)[1]);cat(names(myreq_v)[2])
#cat(names(myreq_v)[3]);cat(names(myreq_v)[4])
###############

#############STEP 1###########################################################
#############load data table##################################################

load("level4/child_food_select.RData")
load("level4/group_name.RData")

#child_food<-read.table("level4/child_food_select.txt",sep="\t",header=TRUE,
#                       quote="\"",fill=TRUE,fileEncoding="GB2312",encoding="utf-8")

#child_food<-read.table("level4/child_food_select_formated.txt",sep="\t",header=TRUE,
#                       quote="\"",fill=TRUE,fileEncoding="utf-8",encoding="utf-8")


###########STEP 2
###########define food groups by the gold standard food groups

group_name<-strsplit(group_name,"___")

#get data for each group
group1_lines<-which(child_food[,"group1"]%in%group_name[[1]]) #milk
group2_lines<-which(child_food[,"group1"]%in%group_name[[2]]) #soya
group3_lines<-which(child_food[,"group1"]%in%group_name[[3]]) #meatfish
group4_lines<-which(child_food[,"group1"]%in%group_name[[4]]) #egg
group5_lines<-which(child_food[,"group1"]%in%group_name[[5]]) #veg
group6_lines<-which(child_food[,"group1"]%in%group_name[[6]]) #frut
group7_lines<-which(child_food[,"group1"]%in%group_name[[7]]) #main food

group8_lines<-which(!child_food[,"group1"]%in%unlist(group_name)) #others

###########STEP 3############################
###########set the count of foods in each group per day (1 count = 100g)

milk<-2
soya<-0.5
meatfish<-1
egg<-0.5
veg<-3
frut<-2
main<-2

others<-0.5

##########STEP 4#####################
##########initiate genetic algorithm functions


##############randomly generate n days' food (n days * 8 types)

rand_days_food<-function(n=1,pre=NA,pre2=NA,needfood=0)
{myresult<-list()
 for(i in 1:n)
 {myresult[[i]]<-rand_oneday_food(pre,pre2,needfood)
 }
 myresult<-do.call(rbind,myresult)
 return(myresult)
}

##############randomly generate n days' food portion (amount of each food in the given range of every day )(n days * 8 types)

rand_days_portion<-function(n=1)
{myresult<-list()
 for(i in 1:n)
 {myresult[[i]]<-c(milk+round(rnorm(1)+1)/2,
                   soya+round(rnorm(1)+1)/4,
                   meatfish+round(rnorm(1)+1)/2,
                   egg,
                   veg+round(rnorm(1)+1)/2,
                   frut+round(rnorm(1)+1)/2,
                   main+round(rnorm(1)+1)/2,
                   others+round(runif(1,0,1))*(0.5)
                   )
 }
 myresult<-do.call(rbind,myresult)
 return(myresult)
}

##############randomly generate one days' food (8 types)
##############the needfood is a vector define the food of the lacking nutrition
##############pre: father food (8 types of food) in the previous generation 
##############pre2: mother food (8 types of food) in the previous generation 

rand_oneday_food<-function(pre=NA,pre2=NA,needfood=0)
{
 l1<-intersect(group1_lines,needfood)
 l2<-intersect(group2_lines,needfood)
 l3<-intersect(group3_lines,needfood)
 l4<-intersect(group4_lines,needfood)
 l5<-intersect(group5_lines,needfood)
 l6<-intersect(group6_lines,needfood)
 l7<-intersect(group7_lines,needfood)
 l8<-intersect(group8_lines,needfood)
 if(length(l1)==0){l1=group1_lines}
 if(length(l2)==0){l2=group2_lines}
 if(length(l3)==0){l3=group3_lines}
 if(length(l4)==0){l4=group4_lines}
 if(length(l5)==0){l5=group5_lines}
 if(length(l6)==0){l6=group6_lines}
 if(length(l7)==0){l7=group7_lines}
 if(length(l8)==0){l8=group8_lines}
 
 x<-c(sample(l1,1),
      sample(l2,1),
      sample(l3,1),
      sample(l4,1),
      sample(l5,1),
      sample(l6,1),
      sample(l7,1),
      sample(l8,1))           #############randomly select 8 types of food in the mutation pools
 if(is.na(pre[1]))
 {return(x)
 }else
 {hybri<-sample(1:8,3)      #############hybridization: randomly select 3 types of food heredity from mother
  muts<-sample(1:8,3)      #############mutation: randomly select 3 types of food mutated to new foods
  child<-pre               ##############food given by father
  child[hybri]<-pre2[hybri]  ############food given by mother
  child[muts]<-x[muts]       ############food given by mutation
  return(child)
 }
}

nutr<-function(x,portions)  ################# calculate the nutrition of foods
{   myresult<-list()
    for(i in 1:length(x))
    {myresult[[i]]<-portions[i]*(unlist(child_food[x[i],18:61]))
    }
    do.call(rbind,myresult)
}

get_nut_highfood<-function(nut)   ##########calculate the top 20 foods with highest given nutrition
{myresult<-vector()
 for(i in 1:length(nut))
 {myresult<-c(myresult,order(child_food[,nut[i]],na.last=TRUE,decreasing=TRUE)[1:20])
 }
 return(myresult)
}



##########STEP 5#####################
##########genetic algorithm



flag=0
generation=0
while((flag == 0)&&(generation<100))              ############start the genetic algorithm
{
 if(generation==0)                                   ########initiate 7 days food in the first generation
 {n=7
  p1=NA;p2=NA
  myfood=rand_days_food(n=n,pre=p1,pre2=p2)
  myportion=rand_days_portion(n=n)
 }else                                              #########breeding food children (5 days) from food father and mother
 {n=5
  p1<-myfood[1,]                                     #########1st food in the previous generation will be the food father                      
  p2<-myfood[2,]                                      #########2nd food in the previous generation will be the food mother           
  portion1<-myportion[1,]
  portion2<-myportion[2,]
  needfood<-get_nut_highfood(nopassnutrs)           ######define the needing food with lacking nutrition
  myfood=rand_days_food(n=n,pre=p1,pre2=p2,needfood=needfood)
  myportion=rand_days_portion(n=n)
 }
 
 if(generation>0)
 {myfood<-rbind(myfood,p1,p2)                     ########combine the father, mother, 5 children into the total popultation
  myportion<-rbind(myportion,portion1,portion2)
 }
  
 mynutrs<-list()                                 ######calculate the nutrition of 7 days food
 for(i in 1:7)
 {nutrs<-nutr(myfood[i,],myportion[i,])
  nutrs<-colSums(nutrs,na.rm=TRUE)
  mynutrs[[i]]<-nutrs
 }
 mynutrs<-do.call(rbind,mynutrs)
 
 totalreqnutrs<-(colSums(mynutrs[,names(myreq_v)],na.rm=TRUE))       ############total nutrition
 passnutrs<-which(totalreqnutrs-myreq_v>0)                           ############difference between total nutrition of food and the given nutrition requirement
 nopassnutrs<-names(myreq_v)[!names(myreq_v)%in%names(passnutrs)]    ############get the lacking nutrition
  
 if(length(passnutrs)>=length(myreq_v))                              ###########meet all requirement, and the while loop
 {flag=1
 }else
 {counts<-lapply(1:7,function(j){                                    ###########didn't meet requirement, count the number of qualified foods per day
  length(which((mynutrs[j,names(myreq_v)]-myreq_v_perday)>0))
  })
  counts<-unlist(counts)
  myorder<-rev(order(counts))                                        ##########order the 7 days' food by the number of the qualified food number
  myfood<-myfood[myorder,]
  myportion<-myportion[myorder,]
 }
 generation<-generation+1
}



###################print the results#######################################

myfood_name<-matrix(child_food[myfood,"key_name_cn"],nrow=7,ncol=8)

for(i in 1:nrow(myfood_name))
{cat(i);cat("\t")
 myfood_name[i,]<-paste0(myfood_name[i,]," ",myportion[i,]*100,"g")
 for(j in 1:ncol(myfood_name))
 {cat(myfood_name[i,j]);cat("\t")
 }
 cat("\n")
}

cat("\n")
cat("###################")
cat("\n")

cat("nutr:\t")
for(j in 1:length(myreq_v))
{cat(names(myreq_v)[j]);cat("\t")
}
cat("\n")
for(i in 1:nrow(mynutrs))
{cat(i);cat("\t")
 for(j in 1:length(myreq_v))
 {cat(mynutrs[i,names(myreq_v)][j]);cat("\t")
 }
 cat("\n")
}
cat("Total:\t")
for(j in 1:length(myreq_v))
{cat(totalreqnutrs[j]);cat("\t")
}
cat("\n")


