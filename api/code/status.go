package code

type Status struct {
	Code int
	Msg string
}

var (
	//-------user status
	UserHoliday = &Status{Code: 1,Msg: "假期"}
	UserLeave = &Status{Code: 9,Msg: "离职"}

	//--------todo_status
	TodoNoTStart = &Status{Code: 0,Msg: "未开始"}
	TodoGoing = &Status{Code: 1,Msg: "进行中"}
	TodoFinish = &Status{Code: 2,Msg: "已完结"}
	TodoPause = &Status{Code: 8,Msg: "暂停"}
	TodoCancle = &Status{Code: 9,Msg: "取消"}

	//todo_join status
	JoinNoTStart = &Status{Code: 0,Msg: "未开始"}
	JoinGoing = &Status{Code: 1,Msg: "进行中"}
	JoinFinish = &Status{Code: 2,Msg: "已完结"}
	JoinCancle = &Status{Code: 9,Msg: "取消"}

)


