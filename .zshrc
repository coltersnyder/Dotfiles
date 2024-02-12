alias python='python3.11'

# The next line updates PATH for the Google Cloud SDK.
if [ -f '/Users/csnyder1@mines.edu/Downloads/google-cloud-sdk/path.zsh.inc' ]; then . '/Users/csnyder1@mines.edu/Downloads/google-cloud-sdk/path.zsh.inc'; fi

# The next line enables shell command completion for gcloud.
if [ -f '/Users/csnyder1@mines.edu/Downloads/google-cloud-sdk/completion.zsh.inc' ]; then . '/Users/csnyder1@mines.edu/Downloads/google-cloud-sdk/completion.zsh.inc'; fi

# >>> conda initialize >>>
# !! Contents within this block are managed by 'conda init' !!
__conda_setup="$('/Users/csnyder1@mines.edu/anaconda3/bin/conda' 'shell.zsh' 'hook' 2> /dev/null)"
if [ $? -eq 0 ]; then
    eval "$__conda_setup"
else
    if [ -f "/Users/csnyder1@mines.edu/anaconda3/etc/profile.d/conda.sh" ]; then
        . "/Users/csnyder1@mines.edu/anaconda3/etc/profile.d/conda.sh"
    else
        export PATH="/Users/csnyder1@mines.edu/anaconda3/bin:$PATH"
    fi
fi
unset __conda_setup
# <<< conda initialize <<<

