<template>
<div class="mcdNewCustody">
    <div class="mcdNewCustody-content">
<div>
    <el-form :model="formData" ref="formData">
        <table border="1">
        <tbody>
            <tr>
            <td><span class="pydocx-center"><span class="pydocx-insert">姓名</span></span></td>
            <td colspan="2">
            <el-form-item>
               <el-input  v-model="formData.zfxm"></el-input>
            </el-form-item>
            </td>
            <td colspan="1"><span class="pydocx-center"><span class="pydocx-insert">曾用名</span></span></td>
            <td colspan="3">
            <el-form-item>
                <el-input v-model="formData.cym"></el-input>
            </el-form-item>
            </td>
            <td colspan="1"><span class="pydocx-center"><span class="pydocx-insert">入监日期</span></span></td>
            <td colspan="2">
                <el-form-item>
                    <el-date-picker
                        prefix-icon="<span></span>"
                        v-model="formData.rjrq"
                        value-format="yyyy年M月d日"
                        type="date">
                    </el-date-picker>
                </el-form-item>
            </td>
            </tr>
            <tr>
            <td><span class="pydocx-center"><span class="pydocx-insert">特长（专业等级）</span></span></td>
            <td colspan="2">
                <el-form-item>
               <el-input  v-model="formData.tc"></el-input>
            </el-form-item>
            </td>
            <td colspan="1"><span class="pydocx-center"><span class="pydocx-insert">文化程度</span></span></td>
            <td colspan="3">
                <el-form-item>
                <el-input  v-model="formData.whcd"></el-input>
                </el-form-item>
            </td>
            <td colspan="1"><span class="pydocx-center"><span class="pydocx-insert">婚姻状况</span></span></td>
            <td colspan="2 " class="row-radio">
                <el-form-item>
            <el-radio-group v-model="formData.hyzk">
                <el-radio :label="'已婚'">已婚</el-radio>
                <el-radio :label="'未婚'">未婚</el-radio>
                <el-radio :label="'离婚'">离婚</el-radio>
            </el-radio-group>
        </el-form-item>
            </td>
            </tr>
            <tr>
            <td><span class="pydocx-center"><span class="pydocx-insert">鞋码</span></span></td>
            <td colspan="2">
                <el-form-item>
                <el-input  v-model="formData.xm"></el-input>
                </el-form-item>
            </td>
            <td colspan="1"><span class="pydocx-center"><span class="pydocx-insert">身高</span></span></td>
            <td>
                <el-form-item>
                <el-input  v-model="formData.sg"></el-input>
                </el-form-item>
            </td>
            <td colspan="2"><span class="pydocx-center"><span class="pydocx-insert">体重</span></span></td>
            <td>
                <el-form-item>
                <el-input  v-model="formData.tz"></el-input>
                </el-form-item>
            </td>
            <td colspan="1"><span class="pydocx-center"><span class="pydocx-insert">口音</span></span></td>
            <td>
                <el-form-item>
                <el-input  v-model="formData.ky"></el-input>
                </el-form-item>
            </td>
            </tr>
            <tr>
            <td rowspan="8"><span class="pydocx-center"><span class="pydocx-insert">个 人 简 历</span></span></td>
            <td colspan="5"><span class="pydocx-center"><span class="pydocx-insert">起时----止时</span></span></td>
            <td colspan="2"><span class="pydocx-center"><span class="pydocx-insert">所在单位</span></span></td>
            <td colspan="2"><span class="pydocx-center"><span class="pydocx-insert">职务（职业）</span></span></td>
            </tr>
            <tr>
            <td colspan="5">
                <el-form-item>
                 <el-date-picker
                    v-model="formData.qzsj1"
                    value-format="yyyyMM"
                    type="monthrange"
                    range-separator="至">
                </el-date-picker>
                </el-form-item>
            </td>
            <td colspan="2">
                <el-form-item>
                    <el-input  v-model="formData.szdw1"></el-input>
                </el-form-item>
            </td>
            <td colspan="2">
                <el-form-item>
                    <el-input  v-model="formData.zw1"></el-input>
                </el-form-item>
            </td>
            </tr>
                        <tr>
            <td colspan="5">
                <el-form-item>
                 <el-date-picker
                    v-model="formData.qzsj2"
                    type="monthrange"
                    value-format="yyyyMM"
                    range-separator="至">
                </el-date-picker>
                </el-form-item>
            </td>
            <td colspan="2">
                <el-form-item>
                    <el-input  v-model="formData.szdw2"></el-input>
                </el-form-item>
            </td>
            <td colspan="2">
                <el-form-item>
                    <el-input  v-model="formData.zw2"></el-input>
                </el-form-item>
            </td>
            </tr>
                        <tr>
            <td colspan="5">
                <el-form-item>
                 <el-date-picker
                    v-model="formData.qzsj3"
                    type="monthrange"
                    value-format="yyyyMM"
                    range-separator="至">
                </el-date-picker>
                </el-form-item>
            </td>
            <td colspan="2">
                <el-form-item>
                    <el-input  v-model="formData.szdw3"></el-input>
                </el-form-item>
            </td>
            <td colspan="2">
                <el-form-item>
                    <el-input  v-model="formData.zw3"></el-input>
                </el-form-item>
            </td>
            </tr>
            <tr>
            <td colspan="5">
                <el-form-item>
                 <el-date-picker
                    v-model="formData.qzsj4"
                    type="monthrange"
                    value-format="yyyyMM"
                    range-separator="至">
                </el-date-picker>
                </el-form-item>
            </td>
            <td colspan="2">
                <el-form-item>
                    <el-input  v-model="formData.szdw4"></el-input>
                </el-form-item>
            </td>
            <td colspan="2">
                <el-form-item>
                    <el-input  v-model="formData.zw4"></el-input>
                </el-form-item>
            </td>
            </tr>
                        <tr>
            <td colspan="5">
                <el-form-item>
                 <el-date-picker
                    v-model="formData.qzsj5"
                    type="monthrange"
                    value-format="yyyyMM"
                    range-separator="至">
                </el-date-picker>
                </el-form-item>
            </td>
            <td colspan="2">
                <el-form-item>
                    <el-input  v-model="formData.szdw5"></el-input>
                </el-form-item>
            </td>
            <td colspan="2">
                <el-form-item>
                    <el-input  v-model="formData.zw5"></el-input>
                </el-form-item>
            </td>
            </tr>
                        <tr>
            <td colspan="5">
                <el-form-item>
                 <el-date-picker
                    v-model="formData.qzsj6"
                    type="monthrange"
                    value-format="yyyyMM"
                    range-separator="至">
                </el-date-picker>
                </el-form-item>
            </td>
            <td colspan="2">
                <el-form-item>
                    <el-input  v-model="formData.szdw6"></el-input>
                </el-form-item>
            </td>
            <td colspan="2">
                <el-form-item>
                    <el-input  v-model="formData.zw6"></el-input>
                </el-form-item>
            </td>
            </tr>
                        <tr>
            <td colspan="5">
                <el-form-item>
                 <el-date-picker
                    v-model="formData.qzsj7"
                    type="monthrange"
                    value-format="yyyyMM"
                    range-separator="至">
                </el-date-picker>
                </el-form-item>
            </td>
            <td colspan="2">
                <el-form-item>
                    <el-input  v-model="formData.szdw7"></el-input>
                </el-form-item>
            </td>
            <td colspan="2">
                <el-form-item>
                    <el-input  v-model="formData.zw7"></el-input>
                </el-form-item>
            </td>
            </tr>
            <tr>
            <td rowspan="6"><span class="pydocx-center"><span class="pydocx-insert">主 要 社 会 关 系</span></span></td>
            <td colspan="1"><span class="pydocx-center"><span class="pydocx-insert">姓名</span></span></td>
            <td><span class="pydocx-center"><span class="pydocx-insert">称谓</span></span></td>
            <td><span class="pydocx-center"><span class="pydocx-insert">年龄</span></span></td>
            <td colspan="1"><span class="pydocx-center"><span class="pydocx-insert">电话/QQ</span></span></td>
            <td colspan="2"><span class="pydocx-center"><span class="pydocx-insert">家庭地址</span></span></td>
            <td colspan="2"><span class="pydocx-center"><span class="pydocx-insert">所在单位</span></span></td>
            <td><span class="pydocx-center"><span class="pydocx-insert">职业</span></span></td>
            </tr>
            <tr>
            <td colspan="1">
                <el-form-item>
                    <el-input type="textarea"  v-model="formData.xm1"></el-input>
                </el-form-item>
            </td>
            <td>
                <el-form-item>
                    <el-input  v-model="formData.cw1"></el-input>
                </el-form-item>
            </td>
            <td>
                <el-form-item>
                    <el-input  v-model="formData.nl1"></el-input>
                </el-form-item>
            </td>
            <td colspan="1">
                <el-form-item>
                    <el-input type="textarea"   v-model="formData.dh1"></el-input>
                </el-form-item>
            </td>
            <td colspan="2">
                <el-form-item>
                    <el-input type="textarea"  v-model="formData.dz1"></el-input>
                </el-form-item>
            </td>
            <td colspan="2">
                <el-form-item>
                    <el-input type="textarea"  v-model="formData.szdw10"></el-input>
                </el-form-item>
            </td>
            <td>
                <el-form-item>
                    <el-input v-model="formData.zy1"></el-input>
                </el-form-item>
            </td>
            </tr>
            <tr>
            <td colspan="1">
                <el-form-item>
                    <el-input type="textarea"  v-model="formData.xm2"></el-input>
                </el-form-item>
            </td>
            <td>
                <el-form-item>
                    <el-input  v-model="formData.cw2"></el-input>
                </el-form-item>
            </td>
            <td>
                <el-form-item>
                    <el-input  v-model="formData.nl2"></el-input>
                </el-form-item>
            </td>
            <td colspan="1">
                <el-form-item>
                    <el-input type="textarea"   v-model="formData.dh2"></el-input>
                </el-form-item>
            </td>
            <td colspan="2">
                <el-form-item>
                    <el-input type="textarea"  v-model="formData.dz2"></el-input>
                </el-form-item>
            </td>
            <td colspan="2">
                <el-form-item>
                    <el-input type="textarea"  v-model="formData.szdw20"></el-input>
                </el-form-item>
            </td>
            <td>
                <el-form-item>
                    <el-input v-model="formData.zy2"></el-input>
                </el-form-item>
            </td>
            </tr>
            <tr>
            <td colspan="1">
                <el-form-item>
                    <el-input type="textarea"  v-model="formData.xm3"></el-input>
                </el-form-item>
            </td>
            <td>
                <el-form-item>
                    <el-input  v-model="formData.cw3"></el-input>
                </el-form-item>
            </td>
            <td>
                <el-form-item>
                    <el-input  v-model="formData.nl3"></el-input>
                </el-form-item>
            </td>
            <td colspan="1">
                <el-form-item>
                    <el-input type="textarea"   v-model="formData.dh3"></el-input>
                </el-form-item>
            </td>
            <td colspan="2">
                <el-form-item>
                    <el-input type="textarea"  v-model="formData.dz3"></el-input>
                </el-form-item>
            </td>
            <td colspan="2">
                <el-form-item>
                    <el-input type="textarea"  v-model="formData.szdw30"></el-input>
                </el-form-item>
            </td>
            <td>
                <el-form-item>
                    <el-input v-model="formData.zy3"></el-input>
                </el-form-item>
            </td>
            </tr>
            <tr>
            <td colspan="1">
                <el-form-item>
                    <el-input type="textarea"  v-model="formData.xm4"></el-input>
                </el-form-item>
            </td>
            <td>
                <el-form-item>
                    <el-input  v-model="formData.cw4"></el-input>
                </el-form-item>
            </td>
            <td>
                <el-form-item>
                    <el-input  v-model="formData.nl4"></el-input>
                </el-form-item>
            </td>
            <td colspan="1">
                <el-form-item>
                    <el-input type="textarea"   v-model="formData.dh4"></el-input>
                </el-form-item>
            </td>
            <td colspan="2">
                <el-form-item>
                    <el-input type="textarea"  v-model="formData.dz4"></el-input>
                </el-form-item>
            </td>
            <td colspan="2">
                <el-form-item>
                    <el-input type="textarea"  v-model="formData.szdw40"></el-input>
                </el-form-item>
            </td>
            <td>
                <el-form-item>
                    <el-input v-model="formData.zy4"></el-input>
                </el-form-item>
            </td>
            </tr>
            <tr>
            <td colspan="1">
                <el-form-item>
                    <el-input type="textarea"  v-model="formData.xm5"></el-input>
                </el-form-item>
            </td>
            <td>
                <el-form-item>
                    <el-input  v-model="formData.cw5"></el-input>
                </el-form-item>
            </td>
            <td>
                <el-form-item>
                    <el-input  v-model="formData.nl5"></el-input>
                </el-form-item>
            </td>
            <td colspan="1">
                <el-form-item>
                    <el-input type="textarea"   v-model="formData.dh5"></el-input>
                </el-form-item>
            </td>
            <td colspan="2">
                <el-form-item>
                    <el-input type="textarea"  v-model="formData.dz5"></el-input>
                </el-form-item>
            </td>
            <td colspan="2">
                <el-form-item>
                    <el-input type="textarea"  v-model="formData.szdw50"></el-input>
                </el-form-item>
            </td>
            <td>
                <el-form-item>
                    <el-input v-model="formData.zy5"></el-input>
                </el-form-item>
            </td>
            </tr>
            <tr>
            <td rowspan="6"><span class="pydocx-center"><span class="pydocx-insert">前 科</span></span></td>
            <td colspan="1"><span class="pydocx-center"><span class="pydocx-insert">罪名</span></span></td>
            <td><span class="pydocx-center"><span class="pydocx-insert">刑期</span></span></td>
            <td><span class="pydocx-center"><span class="pydocx-insert">判决机关</span></span></td>
            <td colspan="4"><span class="pydocx-center"><span class="pydocx-insert">刑期起止</span></span></td>
            <td colspan="1"><span class="pydocx-center"><span class="pydocx-insert">服刑地点</span></span></td>
            <td><span class="pydocx-center"><span class="pydocx-insert">实际服刑</span></span></td>
            </tr>
            <tr>
            <td colspan="1">
                <el-form-item>
                    <el-input v-model="formData.zm1"></el-input>
                </el-form-item>
            </td>
            <td>
                <el-form-item>
                    <el-input v-model="formData.xq1"></el-input>
                </el-form-item>
            </td>
            <td>
                <el-form-item>
                    <el-input type="textarea" v-model="formData.pjjg1"></el-input>
                </el-form-item>
            </td>
            <td colspan="4">
                <el-form-item>
                    <el-input v-model="formData.xqqz1"></el-input>
                </el-form-item>
            </td>
            <td colspan="1">
                <el-form-item>
                    <el-input type="textarea" v-model="formData.fxdd1"></el-input>
                </el-form-item>
            </td>
            <td >
               <el-form-item>
                    <el-input v-model="formData.sjfx1"></el-input>
                </el-form-item>
            </td>
            </tr>
            <tr>
            <td colspan="1">
                <el-form-item>
                    <el-input v-model="formData.zm2"></el-input>
                </el-form-item>
            </td>
            <td>
                <el-form-item>
                    <el-input v-model="formData.xq2"></el-input>
                </el-form-item>
            </td>
            <td>
                <el-form-item>
                    <el-input type="textarea" v-model="formData.pjjg2"></el-input>
                </el-form-item>
            </td>
            <td colspan="4">
                <el-form-item>
                    <el-input v-model="formData.xqqz2"></el-input>
                </el-form-item>
            </td>
            <td colspan="1">
                <el-form-item>
                    <el-input type="textarea" v-model="formData.fxdd2"></el-input>
                </el-form-item>
            </td>
            <td >
               <el-form-item>
                    <el-input v-model="formData.sjfx2"></el-input>
                </el-form-item>
            </td>
            </tr>
            <tr>
            <td colspan="1">
                <el-form-item>
                    <el-input v-model="formData.zm3"></el-input>
                </el-form-item>
            </td>
            <td>
                <el-form-item>
                    <el-input v-model="formData.xq3"></el-input>
                </el-form-item>
            </td>
            <td>
                <el-form-item>
                    <el-input type="textarea" v-model="formData.pjjg3"></el-input>
                </el-form-item>
            </td>
            <td colspan="4">
                <el-form-item>
                    <el-input v-model="formData.xqqz3"></el-input>
                </el-form-item>
            </td>
            <td colspan="1">
                <el-form-item>
                    <el-input type="textarea" v-model="formData.fxdd3"></el-input>
                </el-form-item>
            </td>
            <td >
               <el-form-item>
                    <el-input v-model="formData.sjfx3"></el-input>
                </el-form-item>
            </td>
            <tr>
            <td colspan="1">
                <el-form-item>
                    <el-input v-model="formData.zm4"></el-input>
                </el-form-item>
            </td>
            <td>
                <el-form-item>
                    <el-input v-model="formData.xq4"></el-input>
                </el-form-item>
            </td>
            <td>
                <el-form-item>
                    <el-input type="textarea" v-model="formData.pjjg4"></el-input>
                </el-form-item>
            </td>
            <td colspan="4">
                <el-form-item>
                    <el-input v-model="formData.xqqz4"></el-input>
                </el-form-item>
            </td>
            <td colspan="1">
                <el-form-item>
                    <el-input type="textarea" v-model="formData.fxdd4"></el-input>
                </el-form-item>
            </td>
            <td >
               <el-form-item>
                    <el-input v-model="formData.sjfx4"></el-input>
                </el-form-item>
            </td>
            </tr>
            <tr>
            <td colspan="1">
                <el-form-item>
                    <el-input v-model="formData.zm5"></el-input>
                </el-form-item>
            </td>
            <td>
                <el-form-item>
                    <el-input v-model="formData.xq5"></el-input>
                </el-form-item>
            </td>
            <td>
                <el-form-item>
                    <el-input type="textarea" v-model="formData.pjjg5"></el-input>
                </el-form-item>
            </td>
            <td colspan="4">
                <el-form-item>
                    <el-input v-model="formData.xqqz5"></el-input>
                </el-form-item>
            </td>
            <td colspan="1">
                <el-form-item>
                    <el-input type="textarea" v-model="formData.fxdd5"></el-input>
                </el-form-item>
            </td>
            <td >
               <el-form-item>
                    <el-input v-model="formData.sjfx5"></el-input>
                </el-form-item>
            </td>
            </tr>
            <tr>
            <td colspan="10"><span class="pydocx-center"><span class="pydocx-insert">入监通知书送达地址</span></span></td>
            </tr>
            <tr>
            <td><span class="pydocx-center"><span class="pydocx-insert">地址</span></span></td>
            <td colspan="4">
                <el-form-item>
                    <el-input type="textarea" v-model="formData.dz"></el-input>
                </el-form-item>
            </td>
            <td><span class="pydocx-center"><span class="pydocx-insert">收件人</span></span></td>
            <td>
            <el-form-item>
                    <el-input type="textarea" v-model="formData.sjr"></el-input>
            </el-form-item>
            </td>
            <td colspan="2"><span class="pydocx-center"><span class="pydocx-insert">邮编</span></span></td>
            <td>
            <el-form-item>
                    <el-input type="textarea" v-model="formData.yb"></el-input>
            </el-form-item>
            </td>
            </tr>
            <tr>
            <td colspan="2"><span class="pydocx-center"><span class="pydocx-insert">认罪态度</span></span></td>
            <td colspan="8">
                <el-form-item class="row-radio">
                    <el-radio-group v-model="formData.rztd">
                        <el-radio :label="'认罪服判'">认罪服判</el-radio>
                        <el-radio :label="'不认罪不服判'">不认罪不服判</el-radio>
                        <el-radio :label="'认罪不服判'">认罪不服判</el-radio>
                    </el-radio-group>
                </el-form-item>
            </td>
            </tr>
            <tr>
            <td colspan="2"><span class="pydocx-center"><span class="pydocx-insert">犯罪前居住状况</span></span></td>
            <td colspan="8">
                <el-form-item class="row-radio">
                    <el-radio-group v-model="formData.fzqjzzk">
                        <el-radio :label="'有固定居住场所（户籍地居住、有房产）'">有固定居住场所（户籍地居住、有房产）</el-radio>
                        <el-radio :label="'有较固定居住场所（持续在同处租房6个月以上）'">有较固定居住场所（持续在同处租房6个月以上）</el-radio>
                        <el-radio :label="'没有固定居住场所；或长期流浪'">没有固定居住场所；或长期流浪</el-radio>
                    </el-radio-group>
                </el-form-item>
            </td>
            </tr>
            <tr>
            <td colspan="2"><span class="pydocx-center"><span class="pydocx-insert">受教育状况</span></span></td>
            <td colspan="8">
                <el-form-item class="row-radio">
                    <el-radio-group v-model="formData.sjyzk">
                        <el-radio :label="'大专以上'">大专以上</el-radio>
                        <el-radio :label="'高中（或中专）'">高中（或中专）</el-radio>
                        <el-radio :label="'文盲'">文盲</el-radio>
                        <el-radio :label="'初中或小学'">初中或小学</el-radio>
                    </el-radio-group>
                </el-form-item>
            </td>
            </tr>
            <tr>
            <td colspan="2"><span class="pydocx-center"><span class="pydocx-insert">婚姻状况</span></span></td>
            <td colspan="8">
                <el-form-item class="row-radio">
                    <el-radio-group v-model="formData.hyzk2">
                        <el-radio :label="'已婚（含事实婚姻）'">已婚（含事实婚姻）</el-radio>
                        <el-radio :label="'未婚'">未婚</el-radio>
                        <el-radio :label="'离婚（含事实婚姻）'">离婚（含事实婚姻）</el-radio>
                        <el-radio :label="'丧偶'">丧偶</el-radio>
                    </el-radio-group>
                </el-form-item>
            </td>
            </tr>
            <tr>
            <td colspan="2"><span class="pydocx-center"><span class="pydocx-insert">与配偶关系</span></span></td>
            <td colspan="8">
                <el-form-item class="row-radio">
                    <el-radio-group v-model="formData.ypogx">
                        <el-radio :label="'较好'">较好</el-radio>
                        <el-radio :label="'感情一般'">感情一般</el-radio>
                        <el-radio :label="'离婚（含事实婚姻）'">离婚（含事实婚姻）</el-radio>
                        <el-radio :label="'分居'">分居</el-radio>
                    </el-radio-group>
                </el-form-item>
            </td>
            </tr>
            <tr>
            <td colspan="2"><span class="pydocx-center"><span class="pydocx-insert">家庭完整情况</span></span></td>
            <td colspan="8">
                <el-form-item class="row-radio">
                    <el-radio-group v-model="formData.ypogx">
                        <el-radio :label="'完整'">完整</el-radio>
                        <el-radio :label="'继父母或收养关系（含单亲家庭）'">继父母或收养关系（含单亲家庭）</el-radio>
                        <el-radio :label="'祖辈抚养'">祖辈抚养</el-radio>
                        <el-radio :label="'孤儿'">孤儿</el-radio>
                    </el-radio-group>
                </el-form-item>
            </td>
            </tr>
            <tr>
            <td colspan="2"><span class="pydocx-center"><span class="pydocx-insert">与父母关系</span></span></td>
            <td colspan="8">
                <el-form-item class="row-radio">
                    <el-radio-group v-model="formData.yfmgx">
                        <el-radio :label="'关系密切'">关系密切</el-radio>
                        <el-radio :label="'较少往来'">较少往来</el-radio>
                        <el-radio :label="'不往来'">不往来</el-radio>
                    </el-radio-group>
                </el-form-item>
            </td>
            </tr>
            <tr>
            <td colspan="2"><span class="pydocx-center"><span class="pydocx-insert">与子女关系</span></span></td>
            <td colspan="8">
                <el-form-item class="row-radio">
                    <el-radio-group v-model="formData.yzngx">
                        <el-radio :label="'关系密切'">关系密切</el-radio>
                        <el-radio :label="'较少往来'">较少往来</el-radio>
                        <el-radio :label="'不往来'">不往来</el-radio>
                    </el-radio-group>
                </el-form-item>
            </td>
            </tr>
            <tr>
            <td colspan="2"><span class="pydocx-center"><span class="pydocx-insert">家庭经济状况</span></span></td>
            <td colspan="8">
                <el-form-item class="row-radio">
                    <el-radio-group v-model="formData.jtjjzk">
                        <el-radio :label="'较好'">较好</el-radio>
                        <el-radio :label="'一般'">一般</el-radio>
                        <el-radio :label="'较困难（低于社会保障标准）'">较困难（低于社会保障标准）</el-radio>
                        <el-radio :label="'困难（有大量债务）'">困难（有大量债务）</el-radio>
                    </el-radio-group>
                </el-form-item>
            </td>
            </tr>
            <tr>
            <td colspan="2"><span class="pydocx-center"><span class="pydocx-insert">犯罪前3年内就业经历（含从事农业、在厂矿企业工作；或自己经营企业、个体户）</span></span></td>
            <td colspan="8">
                <el-form-item class="row-radio">
                    <el-radio-group v-model="formData.jyjl">
                        <el-radio :label="'6个月以上工作经历；或在家务农'">6个月以上工作经历；或在家务农</el-radio>
                        <el-radio :label="'有6个月以下工作经历；或短暂失业；或打工'">有6个月以下工作经历；或短暂失业；或打工</el-radio>
                        <el-radio :label="'无业；或长期失业'">无业；或长期失业</el-radio>
                    </el-radio-group>
                </el-form-item>
            </td>
            </tr>
            <tr>
            <td colspan="2"><span class="pydocx-center"><span class="pydocx-insert">犯罪前（或服刑过程中）掌握劳动技能(谋生能力)情况</span></span></td>
            <td colspan="8">
                <el-form-item class="row-radio">
                    <el-radio-group v-model="formData.msnl">
                        <el-radio :label="'熟练，能应付劳动需要（谋生能力较强）'">熟练，能应付劳动需要（谋生能力较强）</el-radio>
                        <el-radio :label="'不太熟练，基本能应付劳动需要（谋生能力一般）'">不太熟练，基本能应付劳动需要（谋生能力一般）</el-radio>
                        <el-radio :label="'无劳动技能；或老弱病残；（没有谋生能力）'">无劳动技能；或老弱病残；（没有谋生能力）</el-radio>
                    </el-radio-group>
                </el-form-item>
            </td>
            </tr>
            <tr>
            <td colspan="2"><span class="pydocx-insert">过往生活史</span></td>
            <td colspan="8">
                <el-form-item class="row-radio">
                    <el-radio-group v-model="formData.gwshs">
                        <el-radio :label="'逃学'">逃学</el-radio>
                        <el-radio :label="'打架斗殴'">打架斗殴</el-radio>
                        <el-radio :label="'吸毒'">吸毒</el-radio>
                        <el-radio :label="'不正当性关系'">不正当性关系</el-radio>
                        <el-radio :label="'酗酒'">酗酒</el-radio>
                    </el-radio-group>
                </el-form-item>
            </td>
            </tr>
        </tbody>
        </table>
        <el-form-item style="margin-top:20px;margin-bottom:20px;float:right">
            <el-button type="primary" @click="handleSubmit()">提交</el-button>
        </el-form-item>
    </el-form>
</div>
</div>
</div>
</template>

<script>
export default {
  name: 'mcdNewCustody',
  data() {
    return {
      formData: {
      }
    };
  },
  created() {
    this.fetchData();
    history.pushState(null, null, document.URL);
    window.addEventListener('popstate', function() {
      history.pushState(null, null, document.URL);
    });
  },
  methods: {
    async fetchData() {
      let option = {
        zfbh: this.$route.query.zfbh,
        cplb: 'MCD-NCI',
        pglx: '1'
      };
      let { errcode, data } = await this.$api.mcd.fetchData(option);
      if (errcode === 0) {
        data.fxpg_mcd_data.forEach((item) => {
          if (item.zbj.indexOf('-') !== -1) {
            if (this.formData[item.zbj.slice(0, item.zbj.indexOf('-'))] === undefined) {
              this.$set(this.formData, item.zbj.slice(0, item.zbj.indexOf('-')), [item.zbz]);
            } else {
              this.formData[item.zbj.slice(0, item.zbj.indexOf('-'))].push(item.zbz);
            }
          } else {
            this.$set(this.formData, item.zbj, item.zbz);
          }
        });
        Object.keys(this.formData).forEach((index) => {
          // 判断日期数组内元素值大小，需要保证第一个数小于第二个数
          if (this.formData[index] instanceof Object) {
            if (Number(this.formData[index][0]) > Number(this.formData[index][1])) this.formData[index].reverse();
          }
        });
      }
    },
    async handleSubmit() {
      let mcdArr = [];
      var data = JSON.parse(JSON.stringify(this.formData));
      Object.keys(this.formData).forEach((index, item) => {
        if (this.formData[index] instanceof Object) {
          data[`${index}-0`] = this.formData[index][0];
          data[`${index}-1`] = this.formData[index][1];
          delete data[index];
          mcdArr.push({
            cplb: 'MCD-NCI',
            zfbh: this.$route.query.zfbh,
            zbj: `${index}-0`,
            zbz: data[`${index}-0`],
            pglx: '1'
          });
          mcdArr.push({
            cplb: 'MCD-NCI',
            zfbh: this.$route.query.zfbh,
            zbj: `${index}-1`,
            zbz: data[`${index}-1`],
            pglx: '1'
          });
        } else {
          mcdArr.push({
            cplb: 'MCD-NCI',
            zfbh: this.$route.query.zfbh,
            zbj: index,
            zbz: data[index],
            pglx: '1'
          });
        }
      });
      let option = {
        data: mcdArr
      };
      let { errcode } = await this.$api.mcd.insertData(option);
      if (errcode === 0) {
        this.$message({
          message: '量表数据已成功保存',
          type: 'success'
        });
        let options = {
          id: this.$route.query.id,
          cpzt: 1
        };
        let res = await this.$api.mcd.updateLbstate(options);
        if (res.errcode === 0) {
          this.$router.push({
            path: '/enter-information/complete',
            query: {
              cpid: this.$route.query.cpid,
              zfbh: this.$route.query.zfbh,
              final: this.$route.query.final
            }
          });
        } else {
          this.$message.error('量表更新状态有误');
        }
      } else {
        this.$message.error('请检查数据是否有误');
      }
    }
  }
};
</script>
<style lang="scss" scoped>
/deep/ {
    .el-form .el-input__inner{
        width: 100%;
        background: rgba(255, 255, 255, 0);
        color: #FFFFFF;
    }
    .el-form-item{
        margin-bottom: 0px;
    }
    .el-textarea__inner{
        min-height: 10px !important;
        border: 0px solid #DCDFE6;
        font-size: large;
        background-color: rgba(255,255,255,0);
        color: #FFFFFF;
        resize:none
    }
    .el-range-input{
        background-color: rgba(255,255,255,0);
        color: #FFFFFF;
    }
    .el-radio{
        margin-right: 10px;
        margin-left: 10px;
        margin-top: 10px;
        color: #FFFFFF;
    }
    .row-radio .el-radio-group{
        display: flex;
        justify-content: center;
    }
    .el-input--prefix .el-input__inner{
        padding-left: 5px
    }
    .el-input--suffix .el-input__inner{
        padding-right: 20px;
    }
}
        table{
    border: 1px solid #FFFFFF;
    }
    td{
        text-align: center;
        color: #FFFFFF;
        padding: 10px
    }
    .pydocx-center {
        text-align: center;
    }
    .pydocx-insert {
        color: #FFFFFF
    }
    .mcdNewCustody {
        overflow-y: auto;
        width: 100%;
        height: 100%;
        background-image: url('~@/assets/images/enter_info_bg2.png');
        &-content {
            width: 70%;
            margin: 0 auto;
        }
    }
</style>
