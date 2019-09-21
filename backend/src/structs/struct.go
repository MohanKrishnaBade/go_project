package structs

type Article struct {
	ID     string `json.id`
	Header string `json:"header"`
	Body   string `json."body"`
	CreatedAt string `json.createdAt"`
	Type *Type
}

type Type struct {
	ID  string `json.id`
	Name  string `json.name`
	CreatedAt string `json.createdAt`
}
