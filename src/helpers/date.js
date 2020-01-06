export const getDate = (splitter) => {
    const currentTime = new Date()
    const date = ("0" + currentTime.getDate()).slice(-2)
    const month = ("0" + (currentTime.getMonth() + 1)).slice(-2)
    const year = currentTime.getFullYear()

    const now_date = year + splitter + month + splitter + date

    return now_date
}