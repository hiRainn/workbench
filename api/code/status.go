package code

type Status struct {
	Code int
	Msg string
}

var (
	UserHoliday = &Status{Code: 1,Msg: "假期"}
	UserLeave = &Status{Code: 9,Msg: "离职"}
)


