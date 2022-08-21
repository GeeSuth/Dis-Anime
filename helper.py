


def ReturnData(msg, error=False):
    return {
        "error":error,
        "data":msg
    }


def MsgError(msg):
    return ReturnData(msg=msg, error=True)


