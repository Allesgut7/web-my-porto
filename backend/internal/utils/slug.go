package utils

import (
	"regexp"
	"strings"
)

var slugRegex = regexp.MustCompile(`^[a-z0-9]+(?:-[a-z0-9]+)*$`)
var nonAlphaNumericRegex = regexp.MustCompile(`[^a-z0-9]+`)
var multipleHyphenRegex = regexp.MustCompile(`-+`)

func IsValidSlug(slug string) bool {
	return slugRegex.MatchString(slug)
}

func GenerateSlug(input string) string {
	slug := strings.ToLower(strings.TrimSpace(input))
	slug = nonAlphaNumericRegex.ReplaceAllString(slug, "-")
	slug = multipleHyphenRegex.ReplaceAllString(slug, "-")
	slug = strings.Trim(slug, "-")

	return slug
}
