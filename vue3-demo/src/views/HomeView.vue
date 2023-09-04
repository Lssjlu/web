<template>
  <div style="padding: 10px">

    <el-input style="width: 300px" placeholder="请输入名称" v-model="name" clearable></el-input>
    <el-button type="primary" @click="load" style="margin-left: 5px">查询数据</el-button>
    <el-button @click="reset" style="margin-left: 5px">重置数据</el-button>

    <el-button type="primary" @click="handleAdd">新增数据</el-button>

    <div style="margin: 10px 0">
      <el-table :data="state.tableData" style="width: 100%">
        <el-table-column prop="date" label="日期" width="180" align="center" />
        <el-table-column prop="name" label="姓名" width="180" align="center" />
        <el-table-column prop="address" label="地址" align="center" />
        <el-table-column prop="userNo" label="编号" align="center" />
        <el-table-column label="操作">
          <template #default="scope">
            <el-button link type="primary" size="default" @click="handleEdit(scope.row, scope.$index)">编辑</el-button>
            <el-button link type="danger" size="default" @click.prevent="remove(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <div style="margin: 10px 0">
        <el-pagination background layout="total, prev, pager, next, sizes"
                       v-model:current-page="pageNum"
                       v-model:page-size="pageSize"
                       :page-sizes="[1, 2, 5]"
                       :total="total"
                       @size-change="load"
                       @current-change="load"
        />
      </div>
    </div>

    <div style="margin: 20px 0">
      <el-upload ></el-upload>
    </div>

    <el-dialog v-model="dialogFormVisible" title="信息" width="40%">
      <el-form :model="state.form" label-width="100px" style="padding-right: 30px">
        <el-form-item label="日期">
          <el-date-picker v-model="state.form.date" type="date" placeholder="选择日期" value-format="YYYY-MM-DD" style="width: 100%"/>
        </el-form-item>
        <el-form-item label="姓名">
          <el-input v-model="state.form.name" autocomplete="off" />
        </el-form-item>
        <el-form-item label="地址">
          <el-input v-model="state.form.address" autocomplete="off" />
        </el-form-item>
        <el-form-item label="编号">
          <el-input v-model="state.form.userNo" autocomplete="off" />
        </el-form-item>
      </el-form>
      <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click="save">确认</el-button>
      </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import {reactive, ref} from "vue";
import request from "../../utils/request";
import {ElMessage} from "element-plus";

const state = reactive({
  tableData: [],
  form: {},
})

const total = ref(0)
const pageNum = ref(1)
const pageSize = ref(2)

const dialogFormVisible = ref(false)
const globalIndex = ref(-1)   // 全局保存的编辑的行号
const name = ref('')

// 请求后台数据  加载到表格里
const load = () => {
  // pageNum => start
  let start = (pageNum.value - 1) * pageSize.value
  request.get('/user/page?name=' + name.value + '&start=' + start + '&pageSize=' + pageSize.value).then(res => {

    // res.data 就是后台返回的用户数组
    state.tableData = res.data.list
    total.value = res.data.total
  })
}
load()

const reset = () => {
  name.value = ''
  load()
}


// 新增数据  设置新的空的绑值对象  打开弹窗
const handleAdd = () => {
  state.form = {}
  dialogFormVisible.value = true  // 打开弹窗
}

// 保存数据，把数据插入到 tableData里面，并刷新页面数据，弹窗关闭
const save = () => {
  // if (globalIndex.value >= 0) {  // 表示编辑
  //   state.tableData[globalIndex.value] = state.form
  //   globalIndex.value = -1  // 还原回去
  // } else {  // 新增
  //   state.tableData.push(state.form)
  // }

  // request.post('/user/save', state.form).then(res => {
  //   if (res.code === '200') {
  //     ElMessage.success('操作成功')
  //     dialogFormVisible.value = false
  //   } else {
  //     ElMessage.error(res.msg)
  //   }
  // })

  request({
    url: state.form.id ? '/user/update' : '/user/save',
    method: state.form.id ? 'PUT' : 'POST',
    data: state.form
  }).then(res => {
    if (res.code === '200') {
      ElMessage.success('操作成功')
      load() // 调用查询方法  更新表格数据
      dialogFormVisible.value = false
    } else {
      ElMessage.error(res.msg)
    }
  })

}


// 编辑数据，先赋值到表单 再打开弹窗
const handleEdit = (row, index) => {
  const newObj = Object.assign({}, row)
  state.form = reactive(newObj)
  globalIndex.value = index  // 把当前编辑的行号赋值给全局的保存的编辑的行号
  dialogFormVisible.value = true
}

// 删除数据 从index的位置开始 删除1行即可
const remove = (id) => {
  request.delete('/user/del?id=' + id).then(res => {
    if (res.code === '200') {
      ElMessage.success('操作成功')
      load() // 调用查询方法  更新表格数据
    } else {
      ElMessage.error(res.msg)
    }
  })
}
</script>
