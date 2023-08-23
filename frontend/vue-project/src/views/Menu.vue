<script setup>
import {Document, Location, Setting} from "@element-plus/icons-vue";



</script>

<template>

  <el-container>
    <el-header style="background-color: #687179">
      <img src="@/assets/logo.svg" alt="" style="width: 40px; position: relative; top: 10px;">
      <span style="font-size: 20px; margin-left: 15px; color: white">手拉手带小白做毕设</span>
    </el-header>
  </el-container>

  <el-container>
    <el-aside style="overflow: hidden; min-height: 100vh; background-color: #545c64; width: 250px">

      <el-menu
          :default-active="$route.path" router
          active-text-color="#ffd04b"
          background-color="#545c64"
          class="el-menu-vertical-demo"
          default-active="2"
          text-color="#fff"
          @open="handleOpen"
          @close="handleClose"
      >
        <el-sub-menu index="1">
          <template #title>
            <el-icon>
              <location/>
            </el-icon>
            <span>Navigator One</span>
          </template>
          <el-menu-item-group title="Group One">
            <el-menu-item index="/admin">管理员信息</el-menu-item>
            <el-menu-item index="1-2">item two</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group title="Group Two">
            <el-menu-item index="1-3">item three</el-menu-item>
          </el-menu-item-group>
          <el-sub-menu index="1-4">
            <template #title>item four</template>
            <el-menu-item index="1-4-1">item one</el-menu-item>
          </el-sub-menu>
        </el-sub-menu>
        <el-menu-item index="2">
          <el-icon>
            <icon-menu/>
          </el-icon>
          <span>Navigator Two</span>
        </el-menu-item>
        <el-menu-item index="3" disabled>
          <el-icon>
            <document/>
          </el-icon>
          <span>Navigator Three</span>
        </el-menu-item>
        <el-menu-item index="4">
          <el-icon>
            <setting/>
          </el-icon>
          <span>Navigator Four</span>
        </el-menu-item>
      </el-menu>

    </el-aside>
    <el-main>

      <div>
        <el-input style="width: 200px; margin-right: 10px" placeholder="请输入内容"></el-input>
        <el-button type="warning">搜索</el-button>
        <el-button type="primary">新增</el-button>
      </div>

      <div>
        <el-table :data="tableData" style="width: 100%; margin: 15px 0px">
          <el-table-column prop="date" label="日期" width="180"></el-table-column>
          <el-table-column prop="name" label="姓名" width="180"></el-table-column>
          <el-table-column prop="address" label="地址"></el-table-column>
          <el-table-column label="操作">
            <el-button type="primary">编辑</el-button>
            <el-button type="danger">删除</el-button>
          </el-table-column>
        </el-table>
      </div>

      <div class="block">
        <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage4"
            :page-sizes="[10, 20, 30, 40]"
            :page-size="10"
            layout="total, sizes, prev, pager, next, jumper"
            :total="400">
        </el-pagination>
      </div>



    </el-main>
  </el-container>


</template>

<style scoped>


</style>