export default function checkWin(board, sym) {
    if (
        (board[0] === sym && board[1] === sym && board[2] === sym) ||
        (board[3] === sym && board[4] === sym && board[5] === sym) ||
        (board[6] === sym && board[7] === sym && board[8] === sym) ||
        (board[0] === sym && board[3] === sym && board[6] === sym) ||
        (board[1] === sym && board[4] === sym && board[7] === sym) ||
        (board[2] === sym && board[5] === sym && board[8] === sym) ||
        (board[0] === sym && board[4] === sym && board[8] === sym) ||
        (board[2] === sym && board[4] === sym && board[6] === sym)
    ) {
        return true;
    }
    return false;
}
