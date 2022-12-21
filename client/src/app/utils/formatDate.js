export const formatDate = (data) => {
    const date = new Date(data)
    const currentDate = new Date()

    const diffMinutes = currentDate.getMinutes() - date.getMinutes()
    const diffHourse = currentDate.getHours() - date.getHours()
    const diffDays = currentDate.getDate() - date.getDate()

    const year = date.getFullYear()
    const month = date.getMonth()
    const day = date.getDate()
    const hourse = date.getHours()
    const minutes = date.getMinutes()

    if (diffDays > 365) {
        return `${day}.${month + 1}.${year}`
    } else if (diffDays >= 1) {
        return `${day} ${date.toLocaleString('default', { month: 'long' })}`
    } else if (diffHourse >= 1) {
        return `Сегодня ${hourse}:${minutes}`
    } else if (diffMinutes >= 30) {
        return '30 минут назад'
    } else if (diffMinutes >= 10 && diffMinutes < 30) {
        return '10 минут назад'
    } else if (diffMinutes >= 5 && diffMinutes < 10) {
        return '5 минут назад'
    } else if (diffMinutes >= 1 && diffMinutes < 5) {
        return '1 минуту назад'
    } else return 'только что'
}
