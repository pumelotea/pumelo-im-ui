<template>
  <ul class="pagination pagination-sm m-t-none m-b-none">
    <li><a href="javascript:void(0);" @click="getPage(perNumber)"><i class="fa fa-chevron-left"></i></a></li>
    <li v-for="i in pageIndexer" :class="{active:i.current}"><a href="javascript:void(0);" @click="getPage(i.num-1)">{{i.num}}</a></li>
    <li><a href="javascript:void(0);" @click="getPage(nextNumber)"><i class="fa fa-chevron-right"></i></a></li>
  </ul>
</template>

<script>
  export default {
    name: 'JPAPagination',
    data() {
      return {
        pageNumber:0,
        totalPages:0,
        nextNumber:0,
        perNumber:0,
        pageIndexer:[]
      }
    },
    watch:{
      pageNumber(val){
        this.$emit('on-page-number-changed', val)
      }
    },
    methods:{
      setData: function (pageNumber,totalPages) {
        this.pageIndexer = []
        this.pageNumber = pageNumber;
        this.totalPages = totalPages;
        this.nextNumber = pageNumber +1
        this.perNumber = pageNumber -1
        if(this.perNumber < 0){
          this.perNumber = 0
        }
        if(this.nextNumber>totalPages-1){
          this.nextNumber = totalPages-1
        }
        //页数小于5
        if(this.totalPages<=5){
          for(let i=1;i<=this.totalPages;i++){
            if(this.pageNumber+1 === i){
              this.pageIndexer.push({num:i,current:true})
            }else {
              this.pageIndexer.push({num:i,current:false})
            }
          }
        } else {
          //页数大于5
          if(this.pageNumber+1>=1&&this.pageNumber+1<=3){
            for(let i=1;i<=5;i++){
              if(this.pageNumber+1 === i){
                this.pageIndexer.push({num:i,current:true})
              }else {
                this.pageIndexer.push({num:i,current:false})
              }
            }
          }else if(this.pageNumber+1>=this.totalPages-2&&this.pageNumber+1<=this.totalPages){
            for(let i=this.totalPages-5+1;i<=this.totalPages;i++){
              if(this.pageNumber+1 === i){
                this.pageIndexer.push({num:i,current:true})
              }else {
                this.pageIndexer.push({num:i,current:false})
              }
            }
          }else {
            let min = this.pageNumber -1;
            let max = this.pageNumber +3;
            for(let i=min;i<=max;i++)
            {
              if(this.pageNumber+1 === i){
                this.pageIndexer.push({num:i,current:true})
              }else {
                this.pageIndexer.push({num:i,current:false})
              }
            }
          }

        }
      },
      getPage: function (pageNumber) {
        this.pageNumber = pageNumber
      }
    }
  }
</script>
