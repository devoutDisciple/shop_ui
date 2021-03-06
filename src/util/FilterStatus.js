export default {
	// 会员等级
	filterMemberStatus: function(status) {
		let data = '';
		switch (Number(status)) {
			case 1:
				data = '普通用户';
				break;
			case 2:
				data = 'MOVING会员';
				break;
			case 3:
				data = 'MOVING PLUS 会员';
				break;
			default:
				data = '普通用户';
		}
		return data;
	},

	// 角色
	filterRoleStatus: function(status) {
		let data = '';
		switch (Number(status)) {
			case 1:
				data = '超级管理员';
				break;
			case 2:
				data = '店长';
				break;
			case 3:
				data = '店员';
				break;
			default:
				data = '。。。';
		}
		return data;
	},

	// 订单
	filterOrderStatus: function(status) {
		let data = '';
		switch (Number(status)) {
			case 1:
				data = '待收取订单';
				break;
			case 2:
				data = '清洗中订单';
				break;
			case 3:
				data = '待付款';
				break;
			case 4:
				data = '待取货';
				break;
			case 5:
				data = '已完成';
				break;
			case 6:
				data = '预约上门';
				break;
			case 7:
				data = '积分兑换';
				break;
			case 8:
				data = '预约成功';
				break;
			case 9:
				data = '待派送';
				break;
			default:
				data = '待取货';
		}
		return data;
	},

	// 订单
	filterClothingStatus: function(status) {
		let data = '';
		switch (Number(status)) {
			case 6:
				data = '预约上门，未付款';
				break;
			case 8:
				data = '预约成功，已付款';
				break;
			default:
				data = '预约上门，未付款';
		}
		return data;
	},

	filterSendStatus: function(status) {
		let data = '';
		switch (Number(status)) {
			case 1:
				data = 'MOVING洗衣柜';
				break;
			case 2:
				data = '到店自取';
				break;
			default:
				data = 'MOVING洗衣柜';
		}
		return data;
	},
};
