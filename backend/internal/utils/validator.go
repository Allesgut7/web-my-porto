package utils

import (
	"reflect"
	"strings"

	"github.com/go-playground/validator/v10"
)

var validate = validator.New()

func init() {
	validate.RegisterTagNameFunc(func(field reflect.StructField) string {
		jsonTag := field.Tag.Get("json")
		if jsonTag == "" {
			return field.Name
		}

		name := strings.Split(jsonTag, ",")[0]
		if name == "-" {
			return field.Name
		}

		return name
	})
}

func ValidateStruct(payload interface{}) map[string]string {
	err := validate.Struct(payload)
	if err == nil {
		return nil
	}

	errors := make(map[string]string)

	validationErrors, ok := err.(validator.ValidationErrors)
	if !ok {
		errors["error"] = err.Error()
		return errors
	}

	for _, fieldError := range validationErrors {
		fieldName := fieldError.Field()
		errors[fieldName] = validationMessage(fieldError)
	}

	return errors
}

func validationMessage(err validator.FieldError) string {
	field := err.Field()

	switch err.Tag() {
	case "required":
		return field + " is required"
	case "email":
		return field + " must be a valid email"
	case "url":
		return field + " must be a valid URL"
	case "uuid":
		return field + " must be a valid UUID"
	case "min":
		return field + " must be at least " + err.Param() + " characters"
	case "max":
		return field + " must be at most " + err.Param() + " characters"
	case "oneof":
		return field + " must be one of: " + err.Param()
	default:
		return field + " is invalid"
	}
}
