<style lang="scss">
@import '~@/styles/mixins', '~@/styles/variables';
.ms-login-logo{
	width: 100%;
	padding: 10.8% 0;
	background: no-repeat url($baseUrl+'login_title.png') map-get($color,500);
	background-size: 49.6% auto;
	background-position: center center;
}
.ms-login-form{
	padding: 0 5.6%;
	width: 100%;
	.mlf-group{
		width: 100%;
		border-bottom: 1px solid map-get($color,400);
		padding: 4.8% 3%;
		@include flexLayout(flex,justify,center);
		label{
			flex: 0 0 64px;
			width: 64px;
			font-size: 16px;
			line-height: 1;
			letter-spacing: 1px;
			color: map-get($color,300);
		}
		input{
			flex: 0 0 auto;
			width: calc(100% - 64px);
			border:none;
			padding: 0 4.6%;
			outline:none;
			font-size: 16px;
			line-height: 1;
			color: map-get($color,300);
		}
		&.errors{
			transition: border .3s ease-in;
			border-color: map-get($color,600);
		}
		&.btn{
			border:none;
			padding-top: 11.2%;
			.ask-button{
				min-width: auto;
				width: 100%;
				background: map-get($color,100);
				color: map-get($color,200);
				line-height: 1;
				border-radius: 4px;
			}
		}
	}
}
.ask-view.login{
	background: map-get($color,200);
}
</style>
<template>
	<div class="ask-view login" v-nav="$route.meta">
		<div class="ask-view-box">
			<!-- <header class="ms-login-logo"></header> -->
			<form class="ms-login-form" @submit.prevent="singIn">
				<div class="mlf-group" :class="{errors: errors.has('mid')}">
					<label>商户号</label>
					<input type="text" 
						   placeholder="请输入商户号" 
						   v-model="model.mId"
						   v-validate="'required'"
						   name="mid"
						   class="g-input" >
				</div>
				<div class="mlf-group" :class="{errors: errors.has('sid')}">
					<label>门店号</label>
					<input type="text" 
						   placeholder="请输入商户号" 
						   v-model="model.sId"
						   v-validate="'required'"
						   name="sid"
						   class="g-input" >
				</div>
				<div class="mlf-group" :class="{errors: errors.has('name')}">
					<label>工&nbsp;&nbsp;号</label>
					<input type="text" 
						   placeholder="请输入工号" 
						   v-model="model.name"
						   v-validate="'required'"
						   name="name"
						   class="g-input" >
				</div>
				<div class="mlf-group" :class="{errors: errors.has('pass')}">
					<label>密&nbsp;&nbsp;码</label>
					<input type="password" 
						   placeholder="请输入密码" 
						   v-model="model.pass"
						   v-validate="'required'"
						   name="pass"
						   class="g-input" >
				</div>

				<div class="mlf-group btn">
					<ask-button :hover="false" type="submit" text="登录"></ask-button>
				</div>
			</form>
		</div>
	</div>
</template>
<script>
import { User } from '@/services';
import { askDialogToast } from '@/utils';
export default {
	name: 'Login',
	components:{
	},
	data(){
		return {
			model:{
				mId:'',
				sId: '',
				name: '',
				pass: ''
			}
		}
	},
	mounted() {
	},
	methods:{
		singIn(){
			this.$validator.validateAll().then((result) => {
				if(result){
					const userServer = new User();
					userServer.login({
						account: this.model.name,
						pass: this.model.pass,
						wid: this.model.mId,
						unid: this.model.sId
					}).then(r=>{
						this.$nextTick(()=>{
							if (this.$route.query.redirect) {
								this.$router.replace({ path: this.$route.query.redirect })
							} else {
								this.$router.replace({ path: '/'});
							}
						});
					},error=>{
						askDialogToast({ msg: error.message || '登录失败', time: 2000, class: 'danger' });
					});
				}
			})
			
		}
	}
}

</script>
